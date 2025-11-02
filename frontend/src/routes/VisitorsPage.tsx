import Acolitos from "../components/Acolitos";

interface VisitorsPageProps {
    canEdit: boolean;
}


const VisitorsPage = ({canEdit}: VisitorsPageProps) => {
    return (
        <>
            <div className="bg-gray-200 flex justify-center items-center flex-col">
                <Acolitos canEdit={canEdit} />
                <div className="w-[80dvw] h-auto grid grid-cols-3 gap-8 mt-10"></div>
            </div>
        </>
    );
}

export default VisitorsPage;