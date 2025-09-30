export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      categorias: {
        Row: {
          created_at: string | null;
          descripcion: string | null;
          id: number;
          nombre: string;
        };
        Insert: {
          created_at?: string | null;
          descripcion?: string | null;
          id?: number;
          nombre: string;
        };
        Update: {
          created_at?: string | null;
          descripcion?: string | null;
          id?: number;
          nombre?: string;
        };
        Relationships: [];
      };
      configuraciones: {
        Row: {
          clave: string;
          created_at: string | null;
          descripcion: string | null;
          id: number;
          tipo_dato: string | null;
          updated_at: string | null;
          valor: string;
        };
        Insert: {
          clave: string;
          created_at?: string | null;
          descripcion?: string | null;
          id?: number;
          tipo_dato?: string | null;
          updated_at?: string | null;
          valor: string;
        };
        Update: {
          clave?: string;
          created_at?: string | null;
          descripcion?: string | null;
          id?: number;
          tipo_dato?: string | null;
          updated_at?: string | null;
          valor?: string;
        };
        Relationships: [];
      };
      etiquetas: {
        Row: {
          color: string | null;
          created_at: string | null;
          descripcion: string | null;
          id: number;
          nombre: string;
        };
        Insert: {
          color?: string | null;
          created_at?: string | null;
          descripcion?: string | null;
          id?: number;
          nombre: string;
        };
        Update: {
          color?: string | null;
          created_at?: string | null;
          descripcion?: string | null;
          id?: number;
          nombre?: string;
        };
        Relationships: [];
      };
      eventos_log: {
        Row: {
          created_at: string | null;
          datos_json: Json | null;
          entidad_id: number | null;
          entidad_tipo: string | null;
          id: number;
          ip_address: unknown | null;
          tipo_evento: string;
          user_agent: string | null;
          usuario_id: number | null;
        };
        Insert: {
          created_at?: string | null;
          datos_json?: Json | null;
          entidad_id?: number | null;
          entidad_tipo?: string | null;
          id?: number;
          ip_address?: unknown | null;
          tipo_evento: string;
          user_agent?: string | null;
          usuario_id?: number | null;
        };
        Update: {
          created_at?: string | null;
          datos_json?: Json | null;
          entidad_id?: number | null;
          entidad_tipo?: string | null;
          id?: number;
          ip_address?: unknown | null;
          tipo_evento?: string;
          user_agent?: string | null;
          usuario_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'eventos_log_usuario_id_fkey';
            columns: ['usuario_id'];
            isOneToOne: false;
            referencedRelation: 'usuarios';
            referencedColumns: ['id'];
          },
        ];
      };
      marcas: {
        Row: {
          created_at: string | null;
          id: number;
          nombre: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          nombre: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          nombre?: string;
        };
        Relationships: [];
      };
      metadatos_presentaciones: {
        Row: {
          clave: string;
          created_at: string | null;
          id: number;
          presentacion_id: number;
          tipo_dato: string | null;
          valor: string | null;
        };
        Insert: {
          clave: string;
          created_at?: string | null;
          id?: number;
          presentacion_id: number;
          tipo_dato?: string | null;
          valor?: string | null;
        };
        Update: {
          clave?: string;
          created_at?: string | null;
          id?: number;
          presentacion_id?: number;
          tipo_dato?: string | null;
          valor?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'metadatos_presentaciones_presentacion_id_fkey';
            columns: ['presentacion_id'];
            isOneToOne: false;
            referencedRelation: 'presentaciones';
            referencedColumns: ['id'];
          },
        ];
      };
      metadatos_productos: {
        Row: {
          clave: string;
          created_at: string | null;
          id: number;
          producto_id: number;
          tipo_dato: string | null;
          valor: string | null;
        };
        Insert: {
          clave: string;
          created_at?: string | null;
          id?: number;
          producto_id: number;
          tipo_dato?: string | null;
          valor?: string | null;
        };
        Update: {
          clave?: string;
          created_at?: string | null;
          id?: number;
          producto_id?: number;
          tipo_dato?: string | null;
          valor?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'metadatos_productos_producto_id_fkey';
            columns: ['producto_id'];
            isOneToOne: false;
            referencedRelation: 'productos';
            referencedColumns: ['id'];
          },
        ];
      };
      precios_historicos: {
        Row: {
          fecha_registro: string | null;
          id: number;
          notas: string | null;
          precio: number;
          precio_por_unidad_base: number;
          presentacion_id: number;
          tienda_id: number;
          usuario_registro: string | null;
        };
        Insert: {
          fecha_registro?: string | null;
          id?: number;
          notas?: string | null;
          precio: number;
          precio_por_unidad_base: number;
          presentacion_id: number;
          tienda_id: number;
          usuario_registro?: string | null;
        };
        Update: {
          fecha_registro?: string | null;
          id?: number;
          notas?: string | null;
          precio?: number;
          precio_por_unidad_base?: number;
          presentacion_id?: number;
          tienda_id?: number;
          usuario_registro?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'precios_historicos_presentacion_id_fkey';
            columns: ['presentacion_id'];
            isOneToOne: false;
            referencedRelation: 'presentaciones';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'precios_historicos_tienda_id_fkey';
            columns: ['tienda_id'];
            isOneToOne: false;
            referencedRelation: 'tiendas';
            referencedColumns: ['id'];
          },
        ];
      };
      presentaciones: {
        Row: {
          cantidad: number;
          codigo_barras: string | null;
          created_at: string | null;
          descripcion_adicional: string | null;
          id: number;
          marca_id: number;
          nombre_presentacion: string;
          producto_id: number;
          unidad_medida_id: number;
          updated_at: string | null;
        };
        Insert: {
          cantidad: number;
          codigo_barras?: string | null;
          created_at?: string | null;
          descripcion_adicional?: string | null;
          id?: number;
          marca_id: number;
          nombre_presentacion: string;
          producto_id: number;
          unidad_medida_id: number;
          updated_at?: string | null;
        };
        Update: {
          cantidad?: number;
          codigo_barras?: string | null;
          created_at?: string | null;
          descripcion_adicional?: string | null;
          id?: number;
          marca_id?: number;
          nombre_presentacion?: string;
          producto_id?: number;
          unidad_medida_id?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'presentaciones_marca_id_fkey';
            columns: ['marca_id'];
            isOneToOne: false;
            referencedRelation: 'marcas';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'presentaciones_producto_id_fkey';
            columns: ['producto_id'];
            isOneToOne: false;
            referencedRelation: 'productos';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'presentaciones_unidad_medida_id_fkey';
            columns: ['unidad_medida_id'];
            isOneToOne: false;
            referencedRelation: 'unidades_medida';
            referencedColumns: ['id'];
          },
        ];
      };
      productos: {
        Row: {
          categoria_id: number | null;
          created_at: string | null;
          descripcion: string | null;
          id: number;
          nombre: string;
          unidad_base_id: number | null;
          updated_at: string | null;
        };
        Insert: {
          categoria_id?: number | null;
          created_at?: string | null;
          descripcion?: string | null;
          id?: number;
          nombre: string;
          unidad_base_id?: number | null;
          updated_at?: string | null;
        };
        Update: {
          categoria_id?: number | null;
          created_at?: string | null;
          descripcion?: string | null;
          id?: number;
          nombre?: string;
          unidad_base_id?: number | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'productos_categoria_id_fkey';
            columns: ['categoria_id'];
            isOneToOne: false;
            referencedRelation: 'categorias';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'productos_unidad_base_id_fkey';
            columns: ['unidad_base_id'];
            isOneToOne: false;
            referencedRelation: 'unidades_medida';
            referencedColumns: ['id'];
          },
        ];
      };
      productos_etiquetas: {
        Row: {
          created_at: string | null;
          etiqueta_id: number;
          producto_id: number;
        };
        Insert: {
          created_at?: string | null;
          etiqueta_id: number;
          producto_id: number;
        };
        Update: {
          created_at?: string | null;
          etiqueta_id?: number;
          producto_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'productos_etiquetas_etiqueta_id_fkey';
            columns: ['etiqueta_id'];
            isOneToOne: false;
            referencedRelation: 'etiquetas';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'productos_etiquetas_producto_id_fkey';
            columns: ['producto_id'];
            isOneToOne: false;
            referencedRelation: 'productos';
            referencedColumns: ['id'];
          },
        ];
      };
      tiendas: {
        Row: {
          created_at: string | null;
          direccion: string | null;
          id: number;
          nombre: string;
          telefono: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          direccion?: string | null;
          id?: number;
          nombre: string;
          telefono?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          direccion?: string | null;
          id?: number;
          nombre?: string;
          telefono?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      unidades_medida: {
        Row: {
          abreviacion: string;
          id: number;
          nombre: string;
          tipo_medida: string;
        };
        Insert: {
          abreviacion: string;
          id?: number;
          nombre: string;
          tipo_medida: string;
        };
        Update: {
          abreviacion?: string;
          id?: number;
          nombre?: string;
          tipo_medida?: string;
        };
        Relationships: [];
      };
      usuarios: {
        Row: {
          activo: boolean | null;
          configuraciones_json: Json | null;
          created_at: string | null;
          email: string | null;
          id: number;
          nombre: string | null;
          updated_at: string | null;
        };
        Insert: {
          activo?: boolean | null;
          configuraciones_json?: Json | null;
          created_at?: string | null;
          email?: string | null;
          id?: number;
          nombre?: string | null;
          updated_at?: string | null;
        };
        Update: {
          activo?: boolean | null;
          configuraciones_json?: Json | null;
          created_at?: string | null;
          email?: string | null;
          id?: number;
          nombre?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      precios_actuales: {
        Row: {
          cantidad: number | null;
          fecha_registro: string | null;
          id: number | null;
          marca_nombre: string | null;
          nombre_presentacion: string | null;
          notas: string | null;
          precio: number | null;
          precio_por_unidad_base: number | null;
          presentacion_id: number | null;
          producto_nombre: string | null;
          tienda_id: number | null;
          tienda_nombre: string | null;
          unidad_abreviacion: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'precios_historicos_presentacion_id_fkey';
            columns: ['presentacion_id'];
            isOneToOne: false;
            referencedRelation: 'presentaciones';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'precios_historicos_tienda_id_fkey';
            columns: ['tienda_id'];
            isOneToOne: false;
            referencedRelation: 'tiendas';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Functions: {
      calcular_precio_por_unidad_base: {
        Args: {
          precio: number;
          cantidad: number;
          unidad_medida_id: number;
          producto_id: number;
        };
        Returns: number;
      };
      registrar_evento: {
        Args: {
          p_tipo_evento: string;
          p_entidad_tipo: string;
          p_entidad_id: number;
          p_datos_json?: Json;
          p_usuario_id?: number;
        };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
