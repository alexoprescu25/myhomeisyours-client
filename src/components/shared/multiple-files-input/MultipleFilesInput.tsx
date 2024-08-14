import { type FC, type ReactNode, type FormEvent, Fragment, ComponentPropsWithoutRef } from "react";

type FileInputProps = {
    children: ReactNode;
    onSave: (image: FileList) => void
} & ComponentPropsWithoutRef<'input'>;

const MultipleFilesInput: FC<FileInputProps> = ({ children, onSave }) => {
    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const files = ( e.target as HTMLInputElement).files;

        if (!files || !files[0]) return;
        
        console.log(files);

        const uploadedImages = files;
        const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg'];

        for (const item of files) {
            if (!acceptedFormats.includes(item.type)) {
                return console.error('Format is not valid!');
            }
        }

        onSave(uploadedImages);
    }
    return (
        <Fragment>
            <label htmlFor='image'>
                { children }
            </label>
            <input 
                type='file'
                id='image'
                name='image'
                accept='image/*'
                multiple
                onChange={ handleInputChange }
            />
        </Fragment>
    )
}

export default MultipleFilesInput;
