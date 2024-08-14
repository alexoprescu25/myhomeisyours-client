import { type FC, Fragment, useState } from "react";
import classes from './Gallery.module.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { MultipleFilesInput, FileInput, Title, Button, Input, Select } from "components/shared";

import { lArray } from "utils";

import { ReactSortable } from "react-sortablejs";

import { useForm, SubmitHandler, Controller, useFieldArray } from "react-hook-form";

import { config } from "views/account/properties/create/config";

import classNames from "classnames";

type Video = { name: string; url: string; type: string; _id?: string; };
type Image = { name: string; url: string; _id: string; thumbnail: boolean; id: number; };

type GalleryProps = {
    gallery: Image[];
    onDelete: (id: string) => void;
    onSaveGallery: (data: any) => void;
    onSaveFloorplan: (data: File) => void;
    onDeleteFloorplan: () => void;
    onUpdateOrder: (images: Image[]) => void;
    onUpdateVideos: (videos: Video[]) => void;
    videos: Video[];
    floorplan: { name: string; url: string; key: string; }
}

const Gallery: FC<GalleryProps> = ({ gallery, floorplan, videos, onSaveFloorplan, onUpdateOrder, onUpdateVideos, onDeleteFloorplan, onDelete, onSaveGallery }) => {
    const [images, setImages] = useState<Image[]>([...gallery]);
    const [uploadedImage, setUploadedImage] = useState<FileList | any>(null);
    const [uploadedFloorplan, setUploadedFloorplan] = useState<File | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues: { videos: videos } });

    const { 
        fields: videosFields, 
        append: appendVideoConfig, 
        remove: removeVideoConfig 
    } = useFieldArray({ name: "videos", control,  });

    const appendVideo = () => { appendVideoConfig({ name: "", url: "", type: "vimeo" }) }
    const removeVideo = (index: number) => { removeVideoConfig(index); }

    const onSubmit: SubmitHandler<any> = async (data: { videos: { name: string; url: string; type: string }[] }) => {
        onUpdateVideos(data.videos);
    }

    const hasImages = () => gallery && gallery.length > 0;

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

    const handleFloorplan = (image: File) => {
        setUploadedFloorplan(image);
    }

    const handleChangeFloorplan = () => {
        if (!uploadedFloorplan) return;
        onSaveFloorplan(uploadedFloorplan);
    }

    const handleDeleteImage = (image: any) => {
        const copyUploadedImage = Array.from(uploadedImage);
        const findIndex = copyUploadedImage.findIndex((item: any) => item.name === image.name);
        
        if (findIndex !== -1) {
            copyUploadedImage.splice(findIndex, 1);
        }

        setUploadedImage(copyUploadedImage);
    }

    const hasFloorplan = () => Boolean(floorplan && floorplan.key);
    const hasVideos = () => Boolean(videos && videos.length > 0);
    
    return (
        <div className={ classes.gallery }>
            <div className={ classes.gallery__container }>
                
                { hasImages() && (
                    <div className={ classes.gallery__section }>
                        <Title>Current Images</Title>
                        <p className={ classes.gallery__text }>You can easily organize your images by dragging and dropping them below. Just click, hold, and move each image to place them in your desired order.</p>

                            <ReactSortable className={ classes.gallery__images } list={ images } setList={ setImages }>
                                { images.map((item: Image) => (
                                    
                                    <div className={ classes.image } key={ item._id.toString() }>
                                        <div className={ classes.image__container }>
                                            <div className={ classes.image__image }>
                                                <img src={ item.url } alt={ item.name } loading="lazy" />
                                            </div>
                                            <div className={ classes.image__actions }>
                                                <p className={ classes.image__name }> { item.name } </p>
                                                <button className={ classes.image__delete } onClick={ () => { onDelete(item._id) } }>
                                                    <FontAwesomeIcon icon={ faTrash } />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                )) }
                            </ReactSortable>
                        
                        <Button mode="main" onClick={ () => onUpdateOrder(images) }>Update Order</Button>
                    </div>
                ) }

                <div className={ classes.gallery__section }>
                    <Fragment>
                        <Title>Add Images</Title>
                        <div className={ classes.gallery__images }>
                            
                            { uploadedImage && lArray(uploadedImage).map((item: any, index: number) => (

                                <div className={ classes.image } key={ index }>
                                    <div className={ classes.image__container }>
                                        <div className={ classes.image__image }>
                                            <img src={ URL.createObjectURL(item) } alt={ item.name } />
                                        </div>
                                        <div className={ classes.image__actions }>
                                            <p className={ classes.image__name }> { item.name } </p>
                                            <button className={ classes.image__delete } onClick={ () => handleDeleteImage(item) }>
                                                <FontAwesomeIcon icon={ faTrash } />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            )) }    
                            
                            <div className={ classes.gallery__input }>
                                <MultipleFilesInput onSave={ handleProfilePicture }>
                                    <Fragment>
                                        <img src="/images/icons/copyright.png" alt="Image" />
                                    </Fragment>
                                </MultipleFilesInput>
                            </div>
                        </div>

                        <div className={ classes.gallery__actions }>
                            <Button mode="main" onClick={ () => onSaveGallery(uploadedImage) } disabled={ !uploadedImage }>Upload Images</Button>
                        </div>
                    </Fragment>
                </div>

                <div className={ classes.gallery__section }>
                        <Fragment>
                            <div className={ classes.gallery__header }>
                                <Title>Floorplan</Title>
                                <p className={ classes.gallery__subtitle }>
                                    To change the floor plan, simply select a new one from the option "Select Floorplan" and click on "Change Floorplan."
                                </p>
                            </div>

                            <div className={ classes.gallery__images }>

                                { hasFloorplan() && (
                                    <div className={ classes.image }>
                                        <div className={ classes.image__container }>
                                            <div className={ classes.image__image }>
                                                <img src={ floorplan.url } alt={ floorplan.name } />
                                            </div>
                                            <div className={ classes.image__actions }>
                                                <p className={ classes.image__name }> { floorplan.name } </p>
                                                <button className={ classes.image__delete } onClick={ () => onDeleteFloorplan() }>
                                                    <FontAwesomeIcon icon={ faTrash } />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )  }

                                <div className={ classes.gallery__input }>
                                    <FileInput id="floorplan" onSave={ handleFloorplan }>
                                        <Fragment>
                                            <img src="/images/icons/blueprint.png" alt="Image" />
                                            { uploadedFloorplan ? (
                                                <p className={ classes.branding__name }> { uploadedFloorplan.name } </p>
                                            ) : (
                                                <p>{ hasFloorplan() ? 'Select' : 'Add' } Floorplan</p>
                                            ) }
                                        </Fragment>
                                    </FileInput>
                                </div>

                            </div>
                            
                            <div className={ classes.gallery__actions }>
                                <Button mode="main" disabled={ !uploadedFloorplan } onClick={ handleChangeFloorplan }>{ hasFloorplan() ? 'Change' : 'Add' } Floorplan</Button>
                            </div>
                        </Fragment>
                </div>

                <div className={ classes.gallery__section }>
                    <Fragment>
                        <div className={ classes.gallery__title  }>
                            <Title image="vimeo">Videos</Title>
                            <div className={ classes.gallery__buttons }>
                                <button type="button" onClick={ appendVideo }>+</button>
                            </div>
                        </div>

                        <form onSubmit={ handleSubmit(onSubmit) }>
                            <div className={ classNames(classes.gallery__step, classes.gallery__videos) }>
                                {videosFields.map((field, index) => {
                                    return (
                                        <div className={ classes.gallery__video } key={field.id}>
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
                            <div className={ classes.gallery__actions }>
                                <Button type="submit" mode="main">Update Videos</Button>
                            </div>
                        </form>
                    </Fragment>
                </div>

            </div>
        </div>
    )
}

export default Gallery; 