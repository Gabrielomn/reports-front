export class Report{
    title: string;
    theme: string;
    description: string;
    imgLink: string;
    link: string;
    active: boolean
    _id: string
  
    constructor(object){
      this.title = object.title
      this.theme = object.theme
      this.description = object.description
      this.imgLink = object.imgLink
      this.link = object.link
      this._id = object._id
      this.active = false
    }
  }