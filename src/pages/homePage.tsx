import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import CountryEntity from '../entities/country-entity';


export default function HomePage() {

    const [countries, setCountries] = useState([]);

    useEffect(() => {

        var requestOptions = {
            method: 'GET'
        };

        fetch("https://restcountries.com/v3.1/all", requestOptions)
            .then(result => result.json())
            .then(result => {

                let countriesList: CountryEntity[] = [];

                result.map((country) => {
                    countriesList.push({
                        id: country.name.common,
                        name: country.name.common,
                        ptName: country.translations.por.common,
                        flagUrl: country.flags.svg,
                        population: country.population,
                    });

                });

                setCountries(countriesList)

            })
            .catch(error => console.log('error', error));

    }, []);

    return (
        <View style={styles.container}>

            <FlatList style={{ width: '100%', paddingHorizontal: 16, marginTop: 32 }}
                data={countries}
                renderItem={(country) =>

                    <View style={styles.team_item}>
                        <Image source={country.item.flagUrl} style={styles.shield} />
                        <Text style={styles.team_name}>{country.item.name}</Text>
                        <Text style={styles.number}>{country.item.ptName}</Text>
                        <Text style={styles.number}>{country.item.population}</Text>

                    </View>

                }
                keyExtractor={item => item.id.toString()}
            />
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#74f20d',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        width: '100%',
        fontSize: 50,
        fontWeight: '700',
        marginTop: 50,
        color: '#f4e807',
        textAlign: 'left',
        marginLeft: 32,
        backgroundColor: 'blue',
        elevation: 3,
        borderRadius: 17
    },
    shield: {
        width: 40,
        height: 50,
        flex: 2,
        marginRight: 16
    },
    team_name: {
        fontWeight: '500',
        flex: 12,
        textAlign: 'left',
        fontSize: 30
    },
    team_item: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8
    },
    number: {
        flex: 2,
        fontSize: 26,
        color: '#116804'
    }
});


