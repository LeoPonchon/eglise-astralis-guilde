import { useParams } from "react-router-dom";
import { classesData } from "@/data/classesData";
import ClassBuildPage from "../ClassBuildPage/index";

const ClassPage = () => {
    const { slug } = useParams<{ slug: string }>();

    if (!slug || !classesData[slug]) {
        return null;
    }

    const classData = classesData[slug];

    return <ClassBuildPage classData={classData} />;
};

export default ClassPage;

