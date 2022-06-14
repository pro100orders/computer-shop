package com.pro100user.computershopbackend.dto;

import com.pro100user.computershopbackend.entity.enums.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder(toBuilder = true)
public class LaptopCreateDTO extends ProductCreateDTO {

    private String processor;

    private double processorPerformance;

    private int processorAmountCores;

    private int processorAmountThreads;

    private int processorCacheSize;


    private TypeVideoCard videoCardType;

    private String videoCard;

    private int videoCardAmountMemory;

    private VideoCardTypeMemory videoCardTypeMemory;

    private int videoCardPerformance;


    private double displayDiagonal;

    private String displayResolution;

    private String displayMatrixType;

    private String displayFrequency;

    private String displayCoverage;

    private String displayInformation;


    private int ramVolume;

    private double ramFrequency;

    private RAMTypes ramType;

    private int ramSlots;

    private int ramMax;

    private String ramInformation;


    private DriveType driveType;

    private String driveVolumeHDD;

    private String driveVolumeSSD;


    private List<Gate> gates;

    private List<Technology> wirelessTechnology;

    private List<String> multimedia;
}
