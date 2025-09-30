import { CreatePresentation, Presentation } from '@presentation/domain/model';

export interface PresentationPort {
  getPresentationsByProduct(productId: number): Promise<Presentation[]>;
  create(createPresentation: CreatePresentation): Promise<Presentation>;
  getById(id: string): Promise<Presentation>;
}
