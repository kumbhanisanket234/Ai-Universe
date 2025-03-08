from pydantic import BaseModel


class update_device_model(BaseModel):
    owner : str | None = None
    modelType : str | None = None
    modelName : str | None = None
    modelVersion : str | None = None
    modelHeight : str | None = None
    modelWeight : str | None = None
    manufactureName : str | None = None
    feature : str | None = None
    # lastupdate : str | None = None
    summary : str | None = None
    modelId : int | None = None




