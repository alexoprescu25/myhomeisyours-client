import { type FC, type ReactNode, type FormEvent, Fragment } from "react";

type FileInputProps = {
    id: string;
    children: ReactNode;
    onSave: (image: File, url: string) => void
}

const FileInput: FC<FileInputProps> = ({ children, onSave, id }) => {
    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const files = ( e.target as HTMLInputElement).files;

        if (!files || !files[0]) return;
        
        const uploadedImage = files[0];
        const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg'];

        const imageUrl = URL.createObjectURL(uploadedImage);

        if (acceptedFormats.includes(uploadedImage.type)) {
            onSave(uploadedImage, imageUrl || '');
        }
    }
    return (
        <Fragment>
            <label htmlFor={ id }>
                { children }
            </label>
            <input 
                type='file'
                id={ id }
                name={ id }
                accept='image/*'
                onChange={ handleInputChange }
            />
        </Fragment>
    )
}

export default FileInput;