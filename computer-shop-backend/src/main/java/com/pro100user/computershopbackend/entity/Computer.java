package com.pro100user.computershopbackend.entity;

import com.pro100user.computershopbackend.entity.enums.DriveType;
import com.pro100user.computershopbackend.entity.enums.RAMTypes;
import com.pro100user.computershopbackend.entity.enums.TypeVideoCard;
import com.pro100user.computershopbackend.entity.enums.VideoCardTypeMemory;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "computers")
@SuperBuilder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Computer extends Product implements Serializable {

    //Процесор
    @Column(name = "processor", nullable = false)//Процесор
    private String processor;

    @Column(name = "processor_performance")//Продуктивність процесору
    private int processorPerformance;

    @Column(name = "processor_amount_cores")//Кількість ядер
    private int processorAmountCores;

    @Column(name = "processor_frequency")//Тактова частота
    private double processorFrequency;

    @Column(name = "processor_amount_threads")//Кількість потоків
    private int processorAmountThreads;

    @Column(name = "processor_cache_size")//Об'єм кеша
    private double processorCacheSize;



    //Відеокарта
    @Enumerated(EnumType.STRING)
    @Column(name = "video_card_type")//Тип
    private TypeVideoCard videoCardType;

    @Column(name = "video_card")//Відеокарта
    private String videoCard;

    @Column(name = "video_card_amount_memory")//Обсяг відеопам'яті
    private int videoCardAmountMemory;

    @Enumerated(EnumType.STRING)
    @Column(name = "video_card_type_memory")//Тип відеопам'яті
    private VideoCardTypeMemory videoCardTypeMemory;

    @Column(name = "video_card_performance")//Продуктивність відеокарти
    private int videoCardPerformance;



    //Материнська плата
    @Column(name = "motherboard")//Материнська плата
    private String motherboard;

    @Column(name = "motherboard_memory_slots")//Максимальна кількість слотів пам'яті
    private int motherboardMemorySlots;

    @Column(name = "motherboard_max_amount_memory")//Максимальний обсяг пам'яті
    private int motherboardMaxAmountMemory;



    //Оперативна пам'ять
    @Column(name = "ram_volume")//Обсяг
    private int ramVolume;

    @Column(name = "ram_frequency")//Частота
    private double ramFrequency;

    @Enumerated(EnumType.STRING)
    @Column(name = "ram_type")
    private RAMTypes ramType;



    //Внутрішній накопичувач
    @Enumerated(EnumType.STRING)
    @Column(name = "drive_type")//Тип
    private DriveType driveType;

    @Column(name = "drive_volume_HDD")//Об'єм HDD
    private int driveVolumeHDD;

    @Column(name = "drive_volume_SSD")//Об'єм HDD
    private int driveVolumeSSD;
}
