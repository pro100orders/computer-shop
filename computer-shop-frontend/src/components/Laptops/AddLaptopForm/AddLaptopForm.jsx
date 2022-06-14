import $api from "../../../http";
import {useEffect, useState} from "react";
import {Controller, useForm, useFormState} from "react-hook-form";
import {toastr} from "react-redux-toastr";
import {Button, MenuItem, Select, TextField} from "@mui/material";

import './AddLaptopForm.scss';

const AddLaptopForm = ({setLaptops, setOpen}) => {

    const {handleSubmit, control, setValue} = useForm({
        mode: 'onBlur'
    });
    const {errors} = useFormState({
        control
    });

    const [videoCardTypes, setVideoCardTypes] = useState([]);
    const [videoCardTypeMemoryes, setVideoCardTypeMemoryes] = useState([]);
    const [ramTypes, setRamTypes] = useState([]);
    const [driveTypes, setDriveTypes] = useState([]);

    useEffect(() => {
        $api.get("/laptops/video-card-types")
            .then(response => {
                setVideoCardTypes(response.data);
            })
            .catch(reason => {
                toastr.error("Computer shop", "Виникли технічні проблеми");
            });
    }, []);

    useEffect(() => {
        $api.get("/laptops/video-card-type-memories")
            .then(response => {
                setVideoCardTypeMemoryes(response.data);
            })
            .catch(reason => {
                toastr.error("Computer shop", "Виникли технічні проблеми");
            });
    }, []);

    useEffect(() => {
        $api.get("/laptops/ram-types")
            .then(response => {
                setRamTypes(response.data);
            })
            .catch(reason => {
                toastr.error("Computer shop", "Виникли технічні проблеми");
            });
    }, []);

    useEffect(() => {
        $api.get("/laptops/drive-types")
            .then(response => {
                setDriveTypes(response.data);
            })
            .catch(reason => {
                toastr.error("Computer shop", "Виникли технічні проблеми");
            });
    }, []);

    const onSubmit = (laptop) => {
        console.log(laptop);
        $api.post("/laptops", laptop)
            .then(response => {
                if (file != null) {
                    const fd = new FormData();
                    fd.append("image", file, file.name);
                    $api.post("/laptops/image/" + response.data.id, fd)
                        .then(response1 => {
                            setLaptops(prevState => [...prevState, response1.data]);
                            setOpen(false);
                        })
                        .catch(reason => {
                            console.log(reason.response.data.error);
                        })
                } else {
                    setLaptops(prevState => [...prevState, response.data]);
                    setOpen(false);
                }
            })
            .catch(reason => {
                toastr.error("Computer shop", "Виникли технічні проблеми");
            });
    };

    const [file, setFile] = useState(null);

    const fileSelectorHandler = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <div className='add-book-form' style={{width: "1300px"}}>
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
                        name="displayDiagonal"
                        render={({field}) => (
                            <TextField
                                label="Діагональ дисплея"
                                type="number"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.displayDiagonal?.message}
                                helperText={errors.displayDiagonal?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="displayResolution"
                        render={({field}) => (
                            <TextField
                                label="Дозвіл дисплея"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.displayResolution?.message}
                                helperText={errors.displayResolution?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="displayMatrixType"
                        render={({field}) => (
                            <TextField
                                label="Тип матриці дисплея"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.displayMatrixType?.message}
                                helperText={errors.displayMatrixType?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="displayFrequency"
                        render={({field}) => (
                            <TextField
                                label="Частота оновлення дисплея"
                                type="number"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.displayFrequency?.message}
                                helperText={errors.displayFrequency?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="displayCoverage"
                        render={({field}) => (
                            <TextField
                                label="Покриття дислея"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.displayCoverage?.message}
                                helperText={errors.displayCoverage?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="displayInformation"
                        render={({field}) => (
                            <TextField
                                label="Додатково про дисплей"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.displayInformation?.message}
                                helperText={errors.displayInformation?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="ramVolume"
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
                                error={!!errors.ramVolume?.message}
                                helperText={errors.ramVolume?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="ramFrequency"
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
                                error={!!errors.ramFrequency?.message}
                                helperText={errors.ramFrequency?.message}
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
                                    ramTypes &&
                                    ramTypes.map((ramType) => (
                                            <MenuItem key={ramType} value={ramType}>{ramType}</MenuItem>
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
                        name="ramSlots"
                        render={({field}) => (
                            <TextField
                                label="Кількість слотів оперативної пам'яті"
                                type="number"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.ramSlots?.message}
                                helperText={errors.ramSlots?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="ramMax"
                        render={({field}) => (
                            <TextField
                                label="Макс. підтримуваний обсяг оперативної пам'яті"
                                type="number"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.ramMax?.message}
                                helperText={errors.ramMax?.message}
                            />
                        )}
                    />
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="ramInformation"
                        render={({field}) => (
                            <TextField
                                label="Додатково про оперативну пам'ять"
                                size="small"
                                margin="normal"
                                className="add-book-form__input"
                                fullWidth={true}
                                value={field.value}
                                variant={"filled"}
                                onChange={(e) => field.onChange(e)}
                                error={!!errors.ramInformation?.message}
                                helperText={errors.ramInformation?.message}
                            />
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
                    Додати ноутбук
                </Button>
            </form>
        </div>
    );
};

export default AddLaptopForm;