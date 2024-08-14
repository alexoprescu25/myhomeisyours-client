import { type FC, lazy, useState, Fragment } from "react";

import { createPropertySteps } from "constant";

import { createProperty } from "service/property.service";
import { waitFor } from "utils";

const BasicInformation: FC<{ onSubmitData: (data: any) => void }> = lazy(() => import('./BasicInformation'));
const Branding: FC<{ property: any; onUpdateBranding: (param: any) => void; onSkip: () => void }> = lazy(() => import('./Branding'));
const CreatedPropertyScreen: FC<{ property: any; onChangeStep: () => void }> = lazy(() => import('./CreatedPropertyScreen'));

const CreateProperty: FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(createPropertySteps.basicInformation);
    const [createdProperty, setCreatedProperty] = useState<any>(null);

    const handleSubmitProperty = async (data: any) => {
        try {
            const response = await createProperty(data);

            if (response && response.status === 201) {
                setCreatedProperty(response.data.property);
                waitFor(100).then(() => { setCurrentStep(createPropertySteps.branding) });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const goToConfirmation = (imgResponse: any) => {
        setCreatedProperty((prevData: any) => {
            return {...prevData, images: imgResponse.data.images}
        })

        setCurrentStep(createPropertySteps.confirmationScreen);
    }

    const skipBranding = () => {
        setCurrentStep(createPropertySteps.confirmationScreen);
    }

    const handleChangeStep = () => {
        setCurrentStep(createPropertySteps.basicInformation);
    }
    // createdProperty && 
    return (
        <Fragment>
            { currentStep === createPropertySteps.basicInformation && <BasicInformation onSubmitData={ handleSubmitProperty } /> }
            { (createdProperty && currentStep === createPropertySteps.branding) && <Branding property={ createdProperty } onSkip={ skipBranding } onUpdateBranding={ goToConfirmation } /> }
            { (createdProperty && currentStep === createPropertySteps.confirmationScreen) && <CreatedPropertyScreen onChangeStep={ handleChangeStep } property={ createdProperty } /> }
        </Fragment>
    )
}

export default CreateProperty;