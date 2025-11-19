import {mwfUtils} from "vfh-iam-mwf-base";
import {EntityManager} from "vfh-iam-mwf-base";

export class MediaItem extends EntityManager.Entity {
    title;
    src;
    contentType;
    added = Date.now();
    description;

    constructor(title, src, contentType, description) {
        super();
        this.title = title;
        this.src = src;
        this.contentType = contentType;
        this.description = description;
    }

    get addedDateString() {
        return (new Date(this.added)).toLocaleDateString();
    }

    get mediaType() {
        if (this.contentType) {
            var index = this.contentType.indexOf("/");
            if (index > -1) {
                return this.contentType.substring(0,index);
            }
            else {
                return "UNKNOWN";
            }
        }
        else {
            return "UNKNOWN";
        }
    }
}