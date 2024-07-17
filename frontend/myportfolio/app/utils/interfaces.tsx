export interface ProjectInterface {
    startDate: string;
    shortDesc: string;
    longDesc: string;
    groupSize: number;
    projectName: string;
    endDate: string;
    projectID: number;
    usedTech: string[];
    images: string[];
    credits?: string;
    courseID?: string;
    courseName?: string;
    externalLink?: string;
    screencast?: string;
  }


  export interface ProjectIndices{
    left: number;
    start: number;
    right: number;
  }

  export interface ToggleProject {
    projects: ProjectInterface[];
    indices: ProjectIndices;
  }