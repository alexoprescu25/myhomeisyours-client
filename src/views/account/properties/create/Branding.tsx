import { type FC, useState, Fragment } from "react";
import classes from './Branding.module.scss';

import { useForm, SubmitHandler, Controller, useFieldArray } from "react-hook-form";

import { MultipleFilesInput, Input, Select, FileInput, Button, Component, Title } from "components/shared";

import {
    updateVideos, 
    uploadImage, 
    updateImages, 
    uploadFloorplan, 
    updateFloorplan
} from "service/property.service";

import { config } from "./config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { lArray } from "utils";
import classNames from "classnames";

const Branding: FC<{ property: any; onUpdateBranding: (parma: any) => void; onSkip: () => void }> = ({ property, onUpdateBranding, onSkip }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const [uploadedImage, setUploadedImage] = useState<FileList | any>(null);

    const [floorplan, setFloorplan] = useState<File | null>(null);
    const [floorplanUrl, setFloorplanUrl] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { 
        fields: videosFields, 
        append: appendVideoConfig, 
        remove: removeVideoConfig 
    } = useFieldArray({ name: "videos", control });

    const appendVideo = () => { appendVideoConfig({ name: "", url: "", type: "vimeo" }) }
    const removeVideo = (index: number) => { removeVideoConfig(index); }
    
    const handleProfilePicture = (image: FileList) => {
        if (image) {
            if (uploadedImage) {
                const copyData = Array.from(uploadedImage).concat(Array.from(image));
                setUploadedImage(copyData);
            } else {
                setUploadedImage(Array.from(image));
            }
        }
    }

    const handleFloorplan = (image: File, url: string) => {
        if (image) setFloorplan(image);
        if (url) setFloorplanUrl(url);
    }

    const onSubmit: SubmitHandler<any> = async (data: { videos: { name: string; url: string; type: string }[] }) => {
        setIsLoading(true);

        try {
            if (data && data.videos && data.videos.length > 0) {
                await updateVideos(data.videos, property._id.toString());
            }
            
            const imageResponse = await handleSaveImage();
            await handleSaveFloorplan();

            if (imageResponse) {
                onUpdateBranding(imageResponse);
            } else {
                onSkip()
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSaveImage = async () => {
        if (!uploadedImage) return;
        const formData = new FormData();
        let imageResponse;

        for (const item of uploadedImage) {
            formData.append('images', item);
        }

        const response = await uploadImage(formData); 
        
        if (response && response.status === 200) {
            imageResponse =  await updateImages(property._id.toString(), response.data.images)
        }   
        
        return imageResponse
    }

    const handleSaveFloorplan = async () => {
        if (!floorplan) return;
        let floorplanResponse;

        const floorplanData = new FormData();
        floorplanData.append('image', floorplan);

        const uploadResponse = await uploadFloorplan(floorplanData);

        if (uploadResponse && uploadResponse.status === 200) {
            floorplanResponse = await updateFloorplan(
                property._id.toString(), 
                {
                    key: uploadResponse.data.key,
                    name: uploadResponse.data.name,
                    url: uploadResponse.data.url
                }
                
            );
        }

        return floorplanResponse;
    }

    const handleDeleteImage = (image: any) => {
        const copyUploadedImage = Array.from(uploadedImage);
        const findIndex = copyUploadedImage.findIndex((item: any) => item.name === image.name);
        
        if (findIndex !== -1) {
            copyUploadedImage.splice(findIndex, 1);
        }

        setUploadedImage(copyUploadedImage);
    }

    return (
        <Component className={ classes.branding }>
            <div className={ classes.branding__header }>
                <Title>Enhance Your Listing with Beautiful Images</Title>
                <p>Ready to make your listing stand out? Start adding images now and see the difference they make!</p>
            </div>
            <div className={ classes.branding__container }>
                <div className={ classes.branding__assets }>
                    { uploadedImage && lArray(uploadedImage).map((image: any, index: number) => (
                        <div className={ classes.branding__image } key={ index }>
                            <img src={ URL.createObjectURL(image) } alt="Image" />
                            <div className={ classes.branding__actions }>
                                <p> { image.name } </p>
                                <button className={ classes.branding__delete } onClick={ () => handleDeleteImage(image) }>
                                    <FontAwesomeIcon icon={ faTrash } />
                                </button>
                            </div>
                        </div>
                    )) }

                    <div className={ classes.branding__input }>
                        <MultipleFilesInput onSave={ handleProfilePicture }>
                            <Fragment>
                                <img src="/images/icons/copyright.png" alt="Image" />
                            </Fragment>
                        </MultipleFilesInput>
                    </div>
                </div>
            </div>
            <div className={ classes.branding__header }>
                <Title>Floorplan</Title>
                <p>Please add a floor plan to your listing to give potential buyers a complete view of the property's layout. </p>
            </div>
            <div className={ classes.branding__container }>
                <div className={ classes.branding__assets }>
                    { floorplanUrl && (
                        <div className={ classes.branding__image }>
                            <img src={ floorplanUrl } alt="Image" />
                        </div>
                    )}

                    <div className={ classes.branding__input }>
                        <FileInput id="floorplan" onSave={ handleFloorplan }>
                            <Fragment>
                                <img src="/images/icons/blueprint.png" alt="Image" />
                                { floorplan && <p className={ classes.branding__name }> { floorplan.name } </p> }
                            </Fragment>
                        </FileInput>
                    </div>
                </div>
            </div>

            {/* VIDEO */}
            <div className={ classes.branding__title }>
                <Title image="vimeo">Video</Title>
                <div className={ classes.section__buttons }>
                    <button type="button" onClick={ appendVideo }>+</button>
                </div>
                <p>( Click "+" to add your first video )</p>
            </div>
            <div className={ classNames(classes.branding__step, classes.branding__videos) }>
                {videosFields.map((field, index) => {
                    return (
                        <div className={ classes.branding__video } key={field.id}>
                            <section className={ classes.section } key={field.id}>
                                <p className={ classes.section__heading }><strong>Video { Number(index + 1) }</strong></p>
                                <div className={ classes.section__container }>
                                    <Controller control={ control } rules={{ required: 'Name is required' }} name={ `videos.${index}.name` } render={({ field }) => {
                                        return (
                                            <Input required={ true } label="Name" errors={ errors } {...field} />
                                        )
                                    }} />
                                    <Controller control={ control } rules={{ required: 'Url is required' }} name={ `videos.${index}.url` } render={({ field }) => {
                                        return (
                                            <Input required={ true } label="Url" errors={ errors } {...field} />
                                        )
                                    }} />
                                    <Controller name={ `videos.${index}.type` } control={control} rules={{ required: 'Video source is required' }} render={({ field }) => (
                                        <Select {...field} optionsArray={ config.videoConfigArray } errors={ errors } defaultValue='Source' required={ true } />
                                    )} />
                                    <div className={ classes.section__buttons }>
                                        <button type="button" onClick={ appendVideo }>+</button>
                                        <button type="button" onClick={ () => removeVideo(index) }>-</button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    );
                })}
            </div>

            <div className={ classes.branding__submit }>
                <Button mode="main" onClick={ handleSubmit(onSubmit) } isLoading={ isLoading }>Finish Up</Button>
            </div>
        </Component>
    )
}

export default Branding;