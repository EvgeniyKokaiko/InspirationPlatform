
export type homeEntityProps = {
    caption: string,
    created_at: string,
    data_count: number,
    date_of_creation: string,
    id: number,
    image: string,
    initiator: string,
    like_id: string,
    likesCount: number,
    owner: string,
    post_hash: string,
    status: number,
    subscriber: string,
    text: string,
    type: number,
    video: string
}

export class HomePostEntity {
    private readonly _caption: string;
    private readonly _created_at: string;
    private readonly _data_count: number;
    private readonly _date_of_creation: string;
    private readonly _id: number;
    private readonly _image: string;
    private readonly _initiator: string;
    private readonly _like_id: string;
    private _likesCount: number;
    private readonly _owner: string;
    private _post_hash: string | null;
    private readonly _status: number;
    private readonly _subscriber: string;
    private readonly _text: string;
    private readonly _type: number;
    private readonly _video: string;
    constructor(properties: homeEntityProps) {
      this._caption = properties.caption;
      this._created_at = properties.created_at;
      this._data_count = properties.data_count;
      this._date_of_creation = properties.date_of_creation;
      this._id = properties.id;
      this._image = properties.image;
      this._initiator = properties.initiator;
      this._like_id = properties.like_id;
      this._likesCount = properties.likesCount;
      this._owner = properties.owner;
      this._post_hash = properties.post_hash;
      this._status = properties.status;
      this._subscriber = properties.subscriber;
      this._text = properties.text;
      this._type = properties.type;
      this._video = properties.video;
    }

    public get caption(): string {
        return this._caption;
    }

    public get created_at(): string {
        return this._created_at;
    }

    public get data_count(): number {
        return this._data_count;
    }

    public get date_of_creation(): string {
        return this._date_of_creation;
    }

    public get id(): number {
        return this._id;
    }

    public get image(): string {
        return this._image;
    }

    public get initiator(): string {
        return this._initiator;
    }

    public get like_id(): string {
        return this._like_id;
    }

    public get likesCount(): number {
        return this._likesCount;
    }

    public set likesCount(value: number) {
        this._likesCount = value;
    }

    public get owner(): string {
        return this._owner;
    }

    public get post_hash() {
        return this._post_hash;
    }

    public set post_hash(value) {
        this._post_hash = value;
    }
    

    public get status(): number {
        return this._status;
    }

    public get subscriber(): string {
        return this._subscriber;
    }

    public get text(): string {
        return this._text;
    }

    public get type(): number {
        return this._type;
    }
    public get video(): string {
        return this._video;
    }
}