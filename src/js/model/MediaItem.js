import {mwfUtils} from "vfh-iam-mwf-base";
import {EntityManager} from "vfh-iam-mwf-base";

export class MediaItem extends EntityManager.Entity {
    creationDate;
    title;
    imageSource

    constructor(title, imageSource, creationDate) {
        super();
        this.title = title;
        this.imageSource = imageSource;
        this.creationDate = creationDate;
    }

    static germanCapitals = [
        "Berlin",
        "Munich",
        "Stuttgart",
        "Düsseldorf",
        "Wiesbaden",
        "Mainz",
        "Hannover",
        "Hamburg",
        "Dresden",
        "Schwerin"
    ];

    static randomRecentDate() {
        const now = new Date();
        const timestamp = now.getTime() - Math.random();
        return new Date(timestamp);
    }

    static generateRandomItems() {
        return this.germanCapitals.map(city =>
            new MediaItem(
                city,
                "src/resources/ghibliMe.png",
                this.randomRecentDate()
            )
        );
    }

    getFormattedDate(locale = 'de-DE') {
        return this.creationDate.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
    }

    async isImageReachable() {
        try {
            const res = await fetch(this.imageSource, { method: 'HEAD' });
            return res.ok;
        } catch {
            return false;
        }
    }
}