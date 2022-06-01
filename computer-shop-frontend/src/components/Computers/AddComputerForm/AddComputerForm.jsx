import $api from "../../../http";
import {useEffect, useState} from "react";
import {Controller, useForm, useFormState} from "react-hook-form";
import {toastr} from "react-redux-toastr";
import {Button, MenuItem, Select, TextField} from "@mui/material";

import './AddComputerForm.scss';

const AddComputerForm = ({setBooks, setOpen}) => {

    const {handleSubmit, control, setValue} = useForm({
        mode: 'onBlur'
    });
    const {errors} = useFormState({
        control
    });

    const [videoCardTypes, setVideoCardTypes] = useState([]);
    const [videoCardTypeMemoryes, setVideoCardTypeMemoryes] = useState([]);
    const [RAMTypes, setRAMTypes] = useState([]);
    const [driveTypes, setDriveTypes] = useState([]);

    useEffect(() => {
        $api.get("/computers/video-card-types")
            .then(response => {
                setVideoCardTypes(response.data);
            })
            .catch(reason => {
                toastr.error("Shop", "Виникли технічні проблеми");
            });
    }, []);

    useEffect(() => {
        $api.get("/computers/video-card-type-memories")
            .then(response => {
                setVideoCardTypeMemoryes(response.data);
            })
            .catch(reason => {
                toastr.error("Shop", "Виникли технічні проблеми");
            });
    }, []);

    useEffect(() => {
        $api.get("/computers/ram-types")
            .then(response => {
                setRAMTypes(response.data);
            })
            .catch(reason => {
                toastr.error("Shop", "Виникли технічні проблеми");
            });
    }, []);

    useEffect(() => {
        $api.get("/computers/drive-types")
            .then(response => {
                setDriveTypes(response.data);
            })
            .catch(reason => {
                toastr.error("Shop", "Виникли технічні проблеми");
            });
    }, []);

    const onSubmit = (computer) => {
        console.log(computer);
        $api.post("/computers", computer)
            .then(response => {
                if (file != null) {
                    const fd = new FormData();
                    fd.append("image", file, file.name);
                    $api.post("/computers/image/" + response.data.id, fd)
                        .then(response1 => {
                            setBooks(prevState => [...prevState, response1.data]);
                            setOpen(false);
                        })
                        .catch(reason => {
                            console.log(reason.response.data.error);
                        })
                } else {
                    setBooks(prevState => [...prevState, response.data]);
                    setOpen(false);
                }
            })
            .catch(reason => {
                toastr.error("Bookstore", "Виникли технічні проблеми");
            });
    };

    const [file, setFile] = useState(null);

    const fileSelectorHandler = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <div className='add-book-form' style={{width: "600px"}}>
            <form className="add-book-form__form" onSubmit={handleSubmit(onSubmit)}
                  style={{display: "flex", flexWrap: "wrap"}}>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="name"
                        render={({field}) => (
                            <TextField
                                label="Назва"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.name?.message}
                                helperText={errors.name?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <p>Фото:</p>
                    <input variant={"filled"}type={"file"}
                           onChange={fileSelectorHandler}/>
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="price"
                        render={({field}) => (
                            <TextField
                                label="Ціна"
                                type="number"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.price?.message}
                                helperText={errors.price?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="amount"
                        render={({field}) => (
                            <TextField
                                label="Кількість"
                                type="number"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.amount?.message}
                                helperText={errors.amount?.message}
                            />
                        )}
                    />
                </div>


                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="processor"
                        render={({field}) => (
                            <TextField
                                label="Процесор"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.processor?.message}
                                helperText={errors.processor?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="processorPerformance"
                        render={({field}) => (
                            <TextField
                                label="Продуктивність процесору"
                                type="number"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.processorPerformance?.message}
                                helperText={errors.processorPerformance?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="processorAmountCores"
                        render={({field}) => (
                            <TextField
                                label="Кількість ядер"
                                type="number"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.processorAmountCores?.message}
                                helperText={errors.processorAmountCores?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="processorFrequency"
                        render={({field}) => (
                            <TextField
                                label="Тактова частота"
                                type="number"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.processorFrequency?.message}
                                helperText={errors.processorFrequency?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="processorAmountThreads"
                        render={({field}) => (
                            <TextField
                                label="Кількість потоків"
                                type="number"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.processorAmountThreads?.message}
                                helperText={errors.processorAmountThreads?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="processorCacheSize"
                        render={({field}) => (
                            <TextField
                                label="Об'єм кеша"
                                type="number"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.processorCacheSize?.message}
                                helperText={errors.processorCacheSize?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="videoCardType"
                        render={({field}) => (
                            <Select
                                label="Тип відеокарти"
                                size="small"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.videoCardType?.message}
                            >
                                {
                                    videoCardTypes &&
                                    videoCardTypes.map((videoCardType) => (
                                            <MenuItem key={videoCardType} value={videoCardType}>{videoCardType}</MenuItem>
                                        )
                                    )
                                }
                            </Select>
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="videoCard"
                        render={({field}) => (
                            <TextField
                                label="Відеокарта"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.videoCard?.message}
                                helperText={errors.videoCard?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="videoCardAmountMemory"
                        render={({field}) => (
                            <TextField
                                label="Обсяг відеопам'яті"
                                type="number"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.videoCardPerformance?.message}
                                helperText={errors.videoCardPerformance?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="videoCardTypeMemory"
                        render={({field}) => (
                            <Select
                                label="Тип відеопам'яті"
                                size="small"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.videoCardTypeMemory?.message}
                            >
                                {
                                    videoCardTypeMemoryes &&
                                    videoCardTypeMemoryes.map((videoCardTypeMemory) => (
                                            <MenuItem key={videoCardTypeMemory}
                                                      value={videoCardTypeMemory}>{videoCardTypeMemory}</MenuItem>
                                        )
                                    )
                                }
                            </Select>
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="videoCardPerformance"
                        render={({field}) => (
                            <TextField
                                label="Продуктивність відеокарти"
                                type="number"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.videoCardPerformance?.message}
                                helperText={errors.videoCardPerformance?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="motherboard"
                        render={({field}) => (
                            <TextField
                                label="Материнська плата"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.motherboard?.message}
                                helperText={errors.motherboard?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="motherboardMemorySlots"
                        render={({field}) => (
                            <TextField
                                label="Макс. кількість слотів пам'яті на материнці"
                                type="number"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.motherboardMemorySlots?.message}
                                helperText={errors.motherboardMemorySlots?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="motherboardMaxAmountMemory"
                        render={({field}) => (
                            <TextField
                                label="Макс. обсяг пам'яті на материнці"
                                type="number"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.motherboardMaxAmountMemory?.message}
                                helperText={errors.motherboardMaxAmountMemory?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="RAMVolume"
                        render={({field}) => (
                            <TextField
                                label="Обсяг оперативної пам'яті"
                                type="number"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.RAMVolume?.message}
                                helperText={errors.RAMVolume?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="RAMFrequency"
                        render={({field}) => (
                            <TextField
                                label="Частота оперативної пам'яті"
                                type="number"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.RAMFrequency?.message}
                                helperText={errors.RAMFrequency?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="ramType"
                        render={({field}) => (
                            <Select
                                label="Тип оперативної пам'яті"
                                size="small"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.ramType?.message}
                            >
                                {
                                    RAMTypes &&
                                    RAMTypes.map((RAMType) => (
                                            <MenuItem key={RAMType} value={RAMType}>{RAMType}</MenuItem>
                                        )
                                    )
                                }
                            </Select>
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="driveType"
                        render={({field}) => (
                            <Select
                                label="Тип приводу"
                                size="small"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.driveType?.message}
                            >
                                {
                                    driveTypes &&
                                    driveTypes.map((driveType) => (
                                            <MenuItem key={driveType} value={driveType}>{driveType}</MenuItem>
                                        )
                                    )
                                }
                            </Select>
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="driveVolumeHDD"
                        render={({field}) => (
                            <TextField
                                label="Об'єм HDD"
                                type="number"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.driveVolumeHDD?.message}
                                helperText={errors.driveVolumeHDD?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="driveVolumeSSD"
                        render={({field}) => (
                            <TextField
                                label="Об'єм SSD"
                                type="number"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.driveVolumeSSD?.message}
                                helperText={errors.driveVolumeSSD?.message}
                            />
                        )}
                    />
                </div>

                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="description"
                        render={({field}) => (
                            <TextField
                                label="Опис"
                                multiple
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.description?.message}
                                helperText={errors.description?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="additionally"
                        render={({field}) => (
                            <TextField
                                label="Додатково"
                                multiple
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.additionally?.message}
                                helperText={errors.additionally?.message}
                            />
                        )}
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth={true}
                    disableElevation={true}
                    sx={{
                        marginTop: 2
                    }}
                >
                    Додати книжку
                </Button>
            </form>
        </div>
    );
};

export default AddComputerForm;