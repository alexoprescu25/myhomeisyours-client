import { type FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DOMPurify from "dompurify";
import { Loader } from "components/shared";
import { CreatePropertyFrom } from "components/form";

import { fetchPropertyById } from "service/property.service";

import { config } from "../create/config";

const EditProperty: FC = () => {
    const [property, setProperty] = useState<any>(null);
    const { propertyId } = useParams();

    const getProperty = async () => {
        if (!propertyId) return;

        try {
            const response = await fetchPropertyById(propertyId);

            if (response && response.status === 200) {
                const cleanDescription = DOMPurify.sanitize(response.data.property.description);
                
                setProperty({
                    ...response.data.property,
                    description: cleanDescription 
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = (data: any) => {
        console.log(data);
    }

    useEffect(() => {
        getProperty();
    }, []);

    if (!property) {
        return <Loader />
    }

    return (
        <div>
            <CreatePropertyFrom 
                config={ config }
                initialState={ property }
                onSubmitData={ handleSubmit }
            />
        </div>
    )
}

export default EditProperty;