import { experiences } from "./experience";
import { achievements } from "./achievements";

// Configuration for the combined timeline order (experiences & achievements)
// Only include actual data cards here. Headers ("Work Experience" & "Achievements")
// are automatically generated and dynamically floated between category transitions.
export const journeyItems = [
    {
        id: "journey-01",
        type: "experience",
        side: "left",
        data: experiences[0]
    },
    {
        id: "journey-02",
        type: "experience",
        side: "right",
        data: experiences[1]
    },
    {
        id: "journey-03",
        type: "experience",
        side: "left",
        data: experiences[2]
    },
    {
        id: "journey-04",
        type: "achievement",
        side: "right",
        data: achievements[0]
    },
    {
        id: "journey-05",
        type: "achievement",
        side: "left",
        data: achievements[1]
    }
];
