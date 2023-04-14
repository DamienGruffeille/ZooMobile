import Animal from "./animal";
import Enclosure from "./enclosures";
import Specie from "./specie";

export default interface Action {
    _id: string;
    createdBy: string;
    enclosure: string;
    specie: string;
    animal: string;
    plannedDate: string;
    status: string;
    observation: string;
    createdAt: string;
    updatedAt: string;
}
