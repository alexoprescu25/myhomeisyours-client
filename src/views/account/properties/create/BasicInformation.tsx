import { Fragment, type FC } from "react";

import { config, initialState } from "./config";

import { CreatePropertyFrom } from "components/form";

const BasicInformation: FC<{ onSubmitData: (data: any) => void }> = ({ onSubmitData }) => {
    const handleSubmit = (data: any) => {
        onSubmitData(data);
    }
    
    return (
        <Fragment>
            <CreatePropertyFrom 
                edit={ false }
                config={ config } 
                initialState={ initialState } 
                onSubmitData={ handleSubmit }    
            />
        </Fragment>
    )
}

export default BasicInformation;