import { createContext, useContext, useEffect, useState } from "react";
import { ProjectIndices, ProjectInterface, ToggleProject } from "./interfaces";
import testdata from "./testdata.json";
import { getIndex } from "./helperfunction";
interface ToggleProviderProps {
    children: React.ReactNode;

}

const ToggleProjectContext = createContext<ToggleProject | null>(null);

export function useSlideshowData(): ToggleProject{
    const context = useContext(ToggleProjectContext);
    if (!context) {
        throw new Error('useSlideshowData must be used within a SlideShowDataProvider');
    }
    return context;

}



export function SlideShowDataProvider({ children }: ToggleProviderProps) {
    
    const [projects] = useState<ProjectInterface[]>([...testdata]);
    const [indices, setIndices] = useState<ProjectIndices>(
        {
          start: getIndex(0, -1, projects.length),
          left: 0,
          right: getIndex(0, 1, projects.length)
        }
      )
      
      useEffect(() => {

      })

    const data: ToggleProject = {
      projects,
      indices

    };


    return (
        <>
            <ToggleProjectContext.Provider value={data}>
                {children}
            </ToggleProjectContext.Provider>
        </>
    )
}