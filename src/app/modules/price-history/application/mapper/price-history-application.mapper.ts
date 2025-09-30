import { CreatePriceHistory } from '@price-history/domain/model';
import { EditPriceHistoryFormValue } from '@price-history/ui/modal/edit-price-history.presenter';

export class PriceHistoryApplicationMapper {
  public static toCreateModel(
    editPriceHistoryFormValue: EditPriceHistoryFormValue
  ): CreatePriceHistory {
    const createPriceHistory: CreatePriceHistory = {
      presentation_id: editPriceHistoryFormValue.presentation_id,
      price: Number(editPriceHistoryFormValue.price),
      store_id: editPriceHistoryFormValue.store_id,
    };

    if (editPriceHistoryFormValue.id)
      createPriceHistory.id = editPriceHistoryFormValue.id;

    if (editPriceHistoryFormValue.notes)
      createPriceHistory.notes = editPriceHistoryFormValue.notes;

    return createPriceHistory;
  }
}
