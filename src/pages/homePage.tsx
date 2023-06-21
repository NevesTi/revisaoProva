import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
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
                        flagUrl: country.flags.png,
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
                        <View>
                            <Image source={{ uri: country.item.flagUrl }} style={styles.shield} />
                        </View>
                        <View style={styles.title_name}>

                            <Text style={{fontSize:20, fontWeight:'700'}}>{country.item.name}</Text>
                            <Text style={styles.number_name}>{country.item.ptName}</Text>
                            <Text style={styles.number_population}>{country.item.population}</Text>
                        </View>


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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    team_item: {
        flexDirection:'row',
        marginBottom:16,

    },

    shield: {
        width: 100,
        height: 100,
        marginRight:16,
    },

    number_name: {

    },
    number_population: {

    },
    title_name:{
        justifyContent:'center',
        
    }


});


