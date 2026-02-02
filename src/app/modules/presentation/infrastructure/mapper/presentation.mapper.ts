import { BrandAdapter } from '@modules/main-view/infrastructure/adapter';
import { MeasurementUnitsTransformer } from '@modules/measurement-units/infrastructure/adapter';
import { CreatePresentation, Presentation } from '@presentation/domain/model';
import {
  CreatePresentationDto,
  PresentationDto,
} from '@presentation/infrastructure/dto';
import { ProductTransformer } from '@product/infrastructure/transformer/product.transformer';

export class PresentationMapper {
  public static fromArray(presentationDto: PresentationDto[]): Presentation[] {
    return presentationDto.map(p => PresentationMapper.from(p));
  }

  public static from(presentationDto: PresentationDto): Presentation {
    const presentation: Presentation = {
      barcode: presentationDto.codigo_barras,
      additionalDescription: presentationDto.descripcion_adicional,
      brandId: presentationDto.marca_id,
      createdAt: presentationDto.created_at,
      id: `${presentationDto.id}`,
      presentationName: presentationDto.nombre_presentacion,
      productId: presentationDto.producto_id,
      quantity: presentationDto.cantidad,
      unitOfMeasureId: presentationDto.unidad_medida_id,
      updatedAt: presentationDto.updated_at,
    };

    if (presentationDto.marcas)
      presentation.brand = BrandAdapter.from(presentationDto.marcas);

    if (presentationDto.productos)
      presentation.product = ProductTransformer.from(presentationDto.productos);

    if (presentationDto.unidades_medida)
      presentation.unitOfMeasure = MeasurementUnitsTransformer.from(
        presentationDto.unidades_medida
      );

    return presentation;
  }

  public static toCreate(
    createPresentation: CreatePresentation
  ): CreatePresentationDto {
    const tempCreatePresentationApi: CreatePresentationDto = {
      cantidad: createPresentation.quantity,
      marca_id: createPresentation.brandId,
      nombre_presentacion: createPresentation.presentationName,
      producto_id: createPresentation.productId,
      unidad_medida_id: createPresentation.unitOfMeasureId,
    };

    if (createPresentation.barcode)
      tempCreatePresentationApi.codigo_barras = createPresentation.barcode;

    if (createPresentation.additionalDescription)
      tempCreatePresentationApi.descripcion_adicional =
        createPresentation.additionalDescription;

    return tempCreatePresentationApi;
  }
}
