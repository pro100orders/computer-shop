package com.pro100user.computershopbackend.entity;

import com.pro100user.computershopbackend.entity.enums.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "laptops")
@SuperBuilder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Laptop extends Product implements Serializable {

    //Процесор
    @Column(name = "processor", nullable = false)//Процесор
    private String processor;

    @Column(name = "processor_performance")//Продуктивність процесору
    private double processorPerformance;

    @Column(name = "processor_amount_cores")//Кількість ядер
    private int processorAmountCores;

    @Column(name = "processor_amount_threads")//Кількість потоків
    private int processorAmountThreads;

    @Column(name = "processor_cache_size")//Об'єм кеша
    private int processorCacheSize;



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



    //Дисплей
    @Column(name = "display_diagonal")//Діагональ
    private double displayDiagonal;

    @Column(name = "display_resolution")//Дозвіл
    private String displayResolution;

    @Column(name = "display_matrix_type")//Тип матриці
    private String displayMatrixType;

    @Column(name = "display_frequency")//Частота оновлення
    private double displayFrequency;

    @Column(name = "display_coverage")//Покриття
    private String displayCoverage;

    @Column(name = "display_information")//Додатково
    private String displayInformation;



    //Оперативна пам'ять
    @Column(name = "ram_volume")//Обсяг
    private int ramVolume;

    @Column(name = "ram_frequency")//Частота
    private double ramFrequency;

    @Enumerated(EnumType.STRING)
    @Column(name = "ram_type")//Тип
    private RAMTypes ramType;

    @Column(name = "ram_slots")//Кількість слотів
    private int ramSlots;

    @Column(name = "ram_max")//Максимальний підтримуваний обсяг
    private int ramMax;

    @Column(name = "ram_information")//Додатково
    private String ramInformation;



    //Внутрішній накопичувач
    @Enumerated(EnumType.STRING)
    @Column(name = "drive_type", nullable = false)//Тип
    private DriveType driveType;

    @Column(name = "drive_volume_HDD")//Об'єм HDD
    private String driveVolumeHDD;

    @Column(name = "drive_volume_SSD")//Об'єм HDD
    private String driveVolumeSSD;



    //Порти та бездротові технології
    @ElementCollection(fetch = FetchType.LAZY, targetClass = Gate.class)
    @CollectionTable(
            name = "laptop_gates",
            joinColumns = @JoinColumn(name = "laptop_id", referencedColumnName = "id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "gate", nullable = false)//Порти
    private List<Gate> gates = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY, targetClass = Technology.class)
    @CollectionTable(
            name = "laptop_wireless_technology",
            joinColumns = @JoinColumn(name = "laptop_id", referencedColumnName = "id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "technology", nullable = false)//Бездротові технології
    private List<Technology> wirelessTechnology = new ArrayList<>();



    //Мультимедіа
    @ElementCollection(fetch = FetchType.LAZY, targetClass = Multimedia.class)
    @CollectionTable(
            name = "laptop_multimedia",
            joinColumns = @JoinColumn(name = "laptop_id", referencedColumnName = "id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "multimedia")//Мультимедіа
    private List<String> multimedia = new ArrayList<>();
}
