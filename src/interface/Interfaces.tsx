export interface FormValues {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  }

 export interface LoginFormValues {
    email?: string;
    password?: string;
  }

  export interface ColorLable {
    label?: string;
    color?: string;
  }
  export interface Notedata {
    title?: string;
    label?: string;
    color?: string;
    date?: string,
    creatBy?:string,
    textData?: string,
    id?:string
  }
  
 export const colorOptions: ColorLable[] = [
    { label: "Blogging", color: "#ffdecb" },
    { label: "Working", color: "#beece9" },
    { label: "Personal", color: "#e9dbff" },
    { label: "Trading", color: "#b68ff3" },
    { label: "Technology", color: "#67b956" },
    { label: "Sports", color: "#f1fbb3" },
    { label: "Travelling", color: "green" },
    { label: "Education", color: "#dd57e9" },
    { label: "Finance", color: "#49b0f3" },
    { label: "Politics", color: "#f39449" },
  ];