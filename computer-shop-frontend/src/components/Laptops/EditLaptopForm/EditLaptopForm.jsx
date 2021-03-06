import $api from "../../../http";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Controller, useForm, useFormState} from "react-hook-form";
import {toastr} from "react-redux-toastr";
import {Autocomplete, Button, MenuItem, Select, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

const EditLaptopForm = ({laptop, setOpen}) => {

    const {handleSubmit, control, setValue} = useForm({
        mode: 'onBlur'
    });
    const {errors} = useFormState({
        control
    });

    const navigate = useNavigate();

    useEffect(() => {
        setValue("id", laptop.id);
        setValue("name", laptop.name);
        setValue("price", laptop.price);
        setValue("amount", laptop.amount);

        setValue("processor", laptop.processor);
        setValue("processorPerformance", laptop.processorPerformance);
        setValue("processorAmountCores", laptop.processorAmountCores);
        setValue("processorAmountThreads", laptop.processorAmountThreads);
        setValue("processorCacheSize", laptop.processorCacheSize);

        setValue("videoCardType", laptop.videoCardType);
        setValue("videoCard", laptop.videoCard);
        setValue("videoCardAmountMemory", laptop.videoCardAmountMemory);
        setValue("videoCardTypeMemory", laptop.videoCardTypeMemory);
        setValue("videoCardPerformance", laptop.videoCardPerformance);

        setValue("displayDiagonal", laptop.displayDiagonal);
        setValue("displayResolution", laptop.displayResolution);
        setValue("displayMatrixType", laptop.displayMatrixType);
        setValue("displayFrequency", laptop.displayFrequency);
        setValue("displayCoverage", laptop.displayCoverage);
        setValue("displayInformation", laptop.displayInformation);

        setValue("ramVolume", laptop.ramVolume);
        setValue("ramFrequency", laptop.ramFrequency);
        setValue("ramType", laptop.ramType);
        setValue("ramSlots", laptop.ramSlots);
        setValue("ramMax", laptop.ramMax);
        setValue("ramInformation", laptop.ramInformation);

        setValue("driveType", laptop.driveType);
        setValue("driveVolumeHDD", laptop.driveVolumeHDD);
        setValue("driveVolumeSSD", laptop.driveVolumeSSD);

        setValue("description", laptop.description);
        setValue("additionally", laptop.additionally);
    }, []);

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
                toastr.error("Laptop shop", "?????????????? ???????????????? ????????????????");
            });
    }, []);

    useEffect(() => {
        $api.get("/laptops/video-card-type-memories")
            .then(response => {
                setVideoCardTypeMemoryes(response.data);
            })
            .catch(reason => {
                toastr.error("Laptop shop", "?????????????? ???????????????? ????????????????");
            });
    }, []);

    useEffect(() => {
        $api.get("/laptops/ram-types")
            .then(response => {
                setRamTypes(response.data);
            })
            .catch(reason => {
                toastr.error("Laptop shop", "?????????????? ???????????????? ????????????????");
            });
    }, []);

    useEffect(() => {
        $api.get("/laptops/drive-types")
            .then(response => {
                setDriveTypes(response.data);
            })
            .catch(reason => {
                toastr.error("Laptop shop", "?????????????? ???????????????? ????????????????");
            });
    }, []);

    const onSubmit = (laptop) => {
        console.log(laptop);
        $api.put("/laptops", laptop)
            .then(response => {
                if (file != null) {
                    const fd = new FormData();
                    fd.append("image", file, file.name);
                    $api.post("/laptops/image/" + response.data.id, fd)
                        .then(response1 => {
                            setOpen(false);
                            navigate("/laptops");
                        })
                        .catch(reason => {
                            console.log(reason.response.data.error);
                        })
                } else {
                    setOpen(false);
                    navigate("/laptops");
                }
            })
            .catch(reason => {
                toastr.error("Computer shop", "?????????????? ???????????????? ????????????????");
            });
    };

    const [file, setFile] = useState(null);

    const fileSelectorHandler = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <div className='add-book-form' style={{width: "1100px"}}>
            <form className="add-book-form__form" onSubmit={handleSubmit(onSubmit)}
                  style={{display: "flex", flexWrap: "wrap"}}>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="name"
                        render={({field}) => (
                            <TextField
                                label="??????????"
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
                    <p>????????:</p>
                    <input variant={"filled"}type={"file"}
                           onChange={fileSelectorHandler}/>
                </div>
                <div className={"formInput"}>
                    <Controller
                        control={control}
                        name="price"
                        render={({field}) => (
                            <TextField
                                label="????????"
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
                                label="??????????????????"
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
                                label="????????????????"
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
                                label="???????????????????????????? ??????????????????"
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
                                label="?????????????????? ????????"
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
                                label="?????????????????? ??????????????"
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
                                label="????'???? ????????"
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
                                label="?????? ????????????????????"
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
                                label="????????????????????"
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
                                label="?????????? ????????????????'??????"
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
                                label="?????? ????????????????'??????"
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
                                label="???????????????????????????? ????????????????????"
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
                                label="?????????????????? ??????????????"
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
                                label="???????????? ??????????????"
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
                                label="?????? ?????????????? ??????????????"
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
                                label="?????????????? ?????????????????? ??????????????"
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
                                label="???????????????? ????????????"
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
                                label="?????????????????? ?????? ??????????????"
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
                                label="?????????? ?????????????????????? ??????'??????"
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
                                label="?????????????? ?????????????????????? ??????'??????"
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
                                label="?????? ?????????????????????? ??????'??????"
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
                                label="?????????????????? ???????????? ?????????????????????? ??????'??????"
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
                                label="????????. ?????????????????????????? ?????????? ?????????????????????? ??????'??????"
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
                                label="?????????????????? ?????? ???????????????????? ??????'??????"
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
                                label="?????? ??????????????"
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
                                label="????'???? HDD"
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
                                label="????'???? SSD"
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
                                label="????????"
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
                                label="??????????????????"
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
                    ???????????????????? ??????????????
                </Button>
            </form>
        </div>
    );
};

export default EditLaptopForm;