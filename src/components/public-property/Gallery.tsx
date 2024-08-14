import { type FC, Fragment, useState } from "react";
import classes from './Gallery.module.scss';

import { Button, FullSizeImageModal } from "components/shared";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ReactPlayer from 'react-player'

type Video = { name: string; url: string; type: string; _id: string; }
type Floorplan = { url: string; name: string; _id: string; key: string; };
type Image = { name: string; url: string; key: string; thumbnail: boolean; _id: string; }

type GalleryProps = {
    images: Image[];
    videos: Video[];
    floorplan: Floorplan;
    defaultTab: number;
    onBack: () => void;
}

const videoConfig = {
    youtube: {
      playerVars: { 
        controls: 1,  // Show controls on YouTube videos
        modestbranding: 1,  // Remove YouTube logo
        showinfo: 0, // Hide video info
        rel: 0, // Do not show related videos at the end
      },
    },
    vimeo: {
      playerOptions: {
        controls: true,  // Show controls on Vimeo videos
        portrait: false
      },
    },
}

const Gallery: FC<GalleryProps> = ({ images, floorplan, videos, defaultTab, onBack }) => {
    const [selectedIndex, setIndex] = useState<number | null>(null);
    const [selectedImage, setImage] = useState<Image | Floorplan | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const previousImage = () => {
        if (selectedIndex === null) return;
        const previousImg = images[selectedIndex - 1];
        if (previousImg) {
            setIndex(selectedIndex - 1);
            setImage(previousImg);
        } else {
            setIndex(images.length - 1);
            setImage(images[images.length - 1]);
        }
    }

    const nextImage = () => {
        if (selectedIndex === null) return;
        const nextImg = images[selectedIndex + 1];
        if (nextImg) {
            setIndex(selectedIndex + 1);
            setImage(nextImg)
        } else {
            setIndex(0);
            setImage(images[0]);
        }
    }

    const handleFullSize = (image: Image | Floorplan) => {
        const imgIndex = images.findIndex(item => item._id === image._id);
        if (imgIndex !== null && imgIndex >= 0) setIndex(imgIndex);
        setImage(image);
        setIsOpen(true);
    }

    const hasFloorplan = () => Boolean(
        floorplan &&
        floorplan.hasOwnProperty('url') &&
        floorplan.url !== ''
    )

    return (
        <Fragment>
            <FullSizeImageModal isOpen={ isOpen } onClose={ () => setIsOpen(false) }>
                <div className={ classes.gallery__modal }>
                    <div className={ classes.gallery__image }>
                        { selectedImage && <img src={ selectedImage.url } alt={ selectedImage.name } loading="lazy" /> }
                    </div>
                    { (selectedImage && selectedImage.hasOwnProperty('thumbnail')) && (
                        <div className={ classes.gallery__actions }>
                            <button onClick={ previousImage }>
                                <FontAwesomeIcon icon={ faAngleLeft } />
                            </button>
                            <button onClick={ nextImage }>
                                <FontAwesomeIcon icon={ faAngleRight } />
                            </button>
                        </div>
                    ) }
                </div>
            </FullSizeImageModal>
            
            <section className={ classes.gallery }>
                <div className={ classes.gallery__header }>
                    <Button mode="dark" onClick={ () => { onBack() } }>Back</Button>
                </div>
                <Tabs defaultIndex={ defaultTab }>
                    <TabList>
                        <Tab>Gallery</Tab>
                        { hasFloorplan() && <Tab>Floorplan</Tab> }
                        { (videos && videos.length > 0) && <Tab>Video</Tab> }
                    </TabList>

                    <TabPanel>
                        <div className={ classes.gallery__container }>
                            { images.map((item: Image) => (
                                <figure className={ classes['gallery-item'] } key={ item._id.toString() } onClick={ () => { handleFullSize(item) } }>
                                    <img src={ item.url } className={ classes['gallery-item__image'] } alt={ item.name } loading="lazy" />
                                </figure>
                            )) }
                        </div>
                    </TabPanel>
                    { hasFloorplan() && (
                        <TabPanel>
                            <div className={ classes.gallery__container }>
                                <figure className={ classes['gallery-item'] } onClick={ () => { handleFullSize(floorplan) } }>
                                    <img src={ floorplan.url } className={ classes['gallery-item__image'] } alt={ floorplan.name } loading="lazy" />
                                </figure>
                            </div>
                        </TabPanel>
                    ) }
                    <TabPanel>
                        { (videos && videos.length > 0) && (
                            <div className={ classes.gallery__container }>
                                <div className={ classes.gallery__videos }>
                                    { videos.map((item: Video) => (
                                        <ReactPlayer url={ item.url } key={ item._id} config={ videoConfig } controls={ true } />
                                    )) }
                                </div>
                            </div>
                        ) }
                    </TabPanel>
                </Tabs>
            </section>
        </Fragment>
    )
} 

export default Gallery;