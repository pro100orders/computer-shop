package com.pro100user.computershopbackend.dto;

import com.pro100user.computershopbackend.entity.enums.DriveType;
import com.pro100user.computershopbackend.entity.enums.RAMTypes;
import com.pro100user.computershopbackend.entity.enums.TypeVideoCard;
import com.pro100user.computershopbackend.entity.enums.VideoCardTypeMemory;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder(toBuilder = true)
public class ComputerCreateDTO extends ProductCreateDTO {

    private String processor;

    private int processorPerformance;

    private int processorAmountCores;

    private double processorFrequency;

    private int processorAmountThreads;

    private double processorCacheSize;


    private TypeVideoCard videoCardType;

    private String videoCard;

    private int videoCardAmountMemory;

    private VideoCardTypeMemory videoCardTypeMemory;

    private int videoCardPerformance;


    private String motherboard;

    private int motherboardMemorySlots;

    private int motherboardMaxAmountMemory;


    private int ramVolume;

    private double ramFrequency;

    private RAMTypes ramType;


    private DriveType driveType;

    private int driveVolumeHDD;

    private int driveVolumeSSD;
}
