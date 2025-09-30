-- Tabla de tiendas/supermercados
CREATE TABLE tiendas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion TEXT,
    telefono VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de marcas
CREATE TABLE marcas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de categorías de productos
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Tabla de unidades de medida
CREATE TABLE unidades_medida (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE, -- ej: "unidad", "gramos", "mililitros", "metros"
    abreviacion VARCHAR(10) NOT NULL UNIQUE, -- ej: "u", "g", "ml", "m"
    tipo_medida VARCHAR(20) NOT NULL CHECK (tipo_medida IN ('peso', 'volumen', 'longitud', 'unidad'))
);



-- Tabla de productos base (ej: "Pañitos húmedos", "Leche", "Pan")
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    categoria_id INTEGER REFERENCES categorias(id),
    unidad_base_id INTEGER REFERENCES unidades_medida(id), -- unidad para comparar precios (ej: por unidad, por 100g)
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE presentaciones (
    id SERIAL PRIMARY KEY,
    producto_id INTEGER REFERENCES productos(id) NOT NULL,
    marca_id INTEGER REFERENCES marcas(id) NOT NULL,
    nombre_presentacion VARCHAR(200) NOT NULL, -- ej: "Pañitos húmedos x200 unidades"
    cantidad DECIMAL(10,2) NOT NULL, -- 200 (para pañitos), 500 (para yogurt de 500g)
    unidad_medida_id INTEGER REFERENCES unidades_medida(id) NOT NULL,
    codigo_barras VARCHAR(50),
    descripcion_adicional TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(producto_id, marca_id, cantidad, unidad_medida_id)
);


-- Tabla de precios históricos
CREATE TABLE precios_historicos (
    id SERIAL PRIMARY KEY,
    presentacion_id INTEGER REFERENCES presentaciones(id) NOT NULL,
    tienda_id INTEGER REFERENCES tiendas(id) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    precio_por_unidad_base DECIMAL(10,4) NOT NULL, -- precio calculado por unidad base para comparar
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notas TEXT, -- ej: "en oferta", "precio regular"
    usuario_registro VARCHAR(100) -- por si en el futuro quieres multi-usuario
);



-- Índices para optimizar consultas
CREATE INDEX idx_precios_presentacion_fecha ON precios_historicos(presentacion_id, fecha_registro DESC);
CREATE INDEX idx_precios_tienda_fecha ON precios_historicos(tienda_id, fecha_registro DESC);
CREATE INDEX idx_presentaciones_producto ON presentaciones(producto_id);
CREATE INDEX idx_productos_categoria ON productos(categoria_id);

-- Vista para obtener los precios más recientes por presentación y tienda
CREATE VIEW precios_actuales AS
SELECT DISTINCT ON (ph.presentacion_id, ph.tienda_id)
    ph.id,
    ph.presentacion_id,
    ph.tienda_id,
    ph.precio,
    ph.precio_por_unidad_base,
    ph.fecha_registro,
    ph.notas,
    p.nombre_presentacion,
    pr.nombre as producto_nombre,
    m.nombre as marca_nombre,
    t.nombre as tienda_nombre,
    p.cantidad,
    um.abreviacion as unidad_abreviacion
FROM precios_historicos ph
JOIN presentaciones p ON ph.presentacion_id = p.id
JOIN productos pr ON p.producto_id = pr.id
JOIN marcas m ON p.marca_id = m.id
JOIN tiendas t ON ph.tienda_id = t.id
JOIN unidades_medida um ON p.unidad_medida_id = um.id
ORDER BY ph.presentacion_id, ph.tienda_id, ph.fecha_registro DESC;



-- Función para calcular precio por unidad base
CREATE OR REPLACE FUNCTION calcular_precio_por_unidad_base(
    precio DECIMAL(10,2),
    cantidad DECIMAL(10,2),
    unidad_medida_id INTEGER,
    producto_id INTEGER
) RETURNS DECIMAL(10,4) AS $$
DECLARE
    factor_conversion DECIMAL(10,4) := 1;
    unidad_base_id INTEGER;
    tipo_medida_actual VARCHAR(20);
    tipo_medida_base VARCHAR(20);
BEGIN
    -- Obtener la unidad base del producto
    SELECT unidad_base_id INTO unidad_base_id 
    FROM productos 
    WHERE id = producto_id;
    
    -- Si las unidades son iguales, no hay conversión
    IF unidad_medida_id = unidad_base_id THEN
        RETURN precio / cantidad;
    END IF;
    
    -- Aquí puedes agregar lógica de conversión entre unidades
    -- Por simplicidad, asumimos que ya están en unidades comparables
    RETURN precio / cantidad;
END;
$$ LANGUAGE plpgsql;


-- Trigger para calcular automáticamente el precio por unidad base
CREATE OR REPLACE FUNCTION trigger_calcular_precio_por_unidad_base()
RETURNS TRIGGER AS $$
BEGIN
    NEW.precio_por_unidad_base := calcular_precio_por_unidad_base(
        NEW.precio,
        (SELECT cantidad FROM presentaciones WHERE id = NEW.presentacion_id),
        (SELECT unidad_medida_id FROM presentaciones WHERE id = NEW.presentacion_id),
        (SELECT producto_id FROM presentaciones WHERE id = NEW.presentacion_id)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_calcular_precio_por_unidad_base
    BEFORE INSERT OR UPDATE ON precios_historicos
    FOR EACH ROW
    EXECUTE FUNCTION trigger_calcular_precio_por_unidad_base();



-- Tabla de configuraciones globales (para futuras funcionalidades)
CREATE TABLE configuraciones (
    id SERIAL PRIMARY KEY,
    clave VARCHAR(100) UNIQUE NOT NULL,
    valor TEXT NOT NULL,
    descripcion TEXT,
    tipo_dato VARCHAR(20) DEFAULT 'string' CHECK (tipo_dato IN ('string', 'number', 'boolean', 'json')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Tabla de metadatos para extensibilidad (campos personalizados)
CREATE TABLE metadatos_productos (
    id SERIAL PRIMARY KEY,
    producto_id INTEGER REFERENCES productos(id) NOT NULL,
    clave VARCHAR(100) NOT NULL,
    valor TEXT,
    tipo_dato VARCHAR(20) DEFAULT 'string' CHECK (tipo_dato IN ('string', 'number', 'boolean', 'date', 'json')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(producto_id, clave)
);



-- Tabla de metadatos para presentaciones
CREATE TABLE metadatos_presentaciones (
    id SERIAL PRIMARY KEY,
    presentacion_id INTEGER REFERENCES presentaciones(id) NOT NULL,
    clave VARCHAR(100) NOT NULL,
    valor TEXT,
    tipo_dato VARCHAR(20) DEFAULT 'string' CHECK (tipo_dato IN ('string', 'number', 'boolean', 'date', 'json')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(presentacion_id, clave)
);


-- Tabla de etiquetas para clasificación flexible
CREATE TABLE etiquetas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    color VARCHAR(7), -- código hex para color
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Tabla de relación productos-etiquetas (muchos a muchos)
CREATE TABLE productos_etiquetas (
    producto_id INTEGER REFERENCES productos(id) NOT NULL,
    etiqueta_id INTEGER REFERENCES etiquetas(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (producto_id, etiqueta_id)
);

-- Tabla de usuarios (preparado para futuro multi-usuario)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    nombre VARCHAR(100),
    configuraciones_json JSONB DEFAULT '{}',
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de eventos/log para auditoría y analytics
CREATE TABLE eventos_log (
    id SERIAL PRIMARY KEY,
    tipo_evento VARCHAR(50) NOT NULL, -- 'precio_registrado', 'producto_creado', etc.
    entidad_tipo VARCHAR(50), -- 'producto', 'precio', 'tienda'
    entidad_id INTEGER,
    usuario_id INTEGER REFERENCES usuarios(id),
    datos_json JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para las nuevas tablas
CREATE INDEX idx_metadatos_productos_producto ON metadatos_productos(producto_id);
CREATE INDEX idx_metadatos_presentaciones_presentacion ON metadatos_presentaciones(presentacion_id);
CREATE INDEX idx_eventos_tipo_fecha ON eventos_log(tipo_evento, created_at DESC);
CREATE INDEX idx_eventos_entidad ON eventos_log(entidad_tipo, entidad_id);


-- Función para registrar eventos automáticamente
CREATE OR REPLACE FUNCTION registrar_evento(
    p_tipo_evento VARCHAR(50),
    p_entidad_tipo VARCHAR(50),
    p_entidad_id INTEGER,
    p_datos_json JSONB DEFAULT NULL,
    p_usuario_id INTEGER DEFAULT NULL
) RETURNS VOID AS 
$$
BEGIN
    INSERT INTO eventos_log (tipo_evento, entidad_tipo, entidad_id, datos_json, usuario_id)
    VALUES (p_tipo_evento, p_entidad_tipo, p_entidad_id, p_datos_json, p_usuario_id);
END;
$$
LANGUAGE plpgsql;

-- Triggers para logging automático
CREATE OR REPLACE FUNCTION trigger_log_precio_registrado()
RETURNS TRIGGER AS 
$$
BEGIN
    PERFORM registrar_evento(
        'precio_registrado',
        'precio',
        NEW.id,
        jsonb_build_object(
            'precio', NEW.precio,
            'tienda_id', NEW.tienda_id,
            'presentacion_id', NEW.presentacion_id
        )
    );
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER trg_log_precio_registrado
    AFTER INSERT ON precios_historicos
    FOR EACH ROW
    EXECUTE FUNCTION trigger_log_precio_registrado();


-- Datos iniciales de ejemplo
INSERT INTO unidades_medida (nombre, abreviacion, tipo_medida) VALUES
('Unidad', 'u', 'unidad'),
('Gramos', 'g', 'peso'),
('Kilogramos', 'kg', 'peso'),
('Mililitros', 'ml', 'volumen'),
('Litros', 'l', 'volumen');


INSERT INTO categorias (nombre, descripcion) VALUES
('Higiene y Cuidado Personal', 'Productos de aseo e higiene'),
('Lácteos', 'Leche, yogurt, quesos'),
('Panadería', 'Pan, galletas, productos de panadería'),
('Limpieza', 'Productos para limpieza del hogar'),
('Bebidas', 'Bebidas alcohólicas y no alcohólicas');


INSERT INTO tiendas (nombre, direccion) VALUES
('plazaVea hiper San Miguel', 'Plaza San Miguel, Av. de la Marina 2000, San Miguel 15088');


INSERT INTO marcas (nombre) VALUES
('Huggies'),
('Pampers'),
('Gloria'),
('Laive');
