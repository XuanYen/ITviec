import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
} from "@react-pdf/renderer";
const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        margin: 10
    },
    name: {
        fontSize: 20,
        textAlign: 'center'
    },
    title: {
        fontSize: 18,
        margin: 10,
        fontWeight: 'bold',
        textDecoration: 'underline'
    },
    generalInformation: {
        marginBottom: 15
    },
    text: {
        fontSize: 15,
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 15
    },
});

export function PdfDocument(props) {
    const { data } = props;
    console.log(data)
    return (
        <Document>
            <Page style={styles.page}>
                <View>
                    <Text style={styles.name}>{data.name.toUpperCase()}</Text>
                    <Text style={styles.title}>General Information:</Text>
                    <View style={styles.generalInformation}>
                        <Text style={styles.text}>Address: {data.address}</Text>
                        <Text style={styles.text}>Phone: {data.phone}</Text>
                        <Text style={styles.text}>Email: {data.email}</Text>
                        <Text style={styles.text}>Website: {data.website}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>Education:</Text>
                    {data.education.map(ele => (
                        <View key={ele.id} style={styles.generalInformation}>
                            <Text style={styles.text}>School: {ele.school}</Text>
                            {
                                (ele.timeStart && ele.timeEnd) ? (<Text style={styles.text}>{`${ele.timeStart} - ${ele.timeEnd}`}</Text>) : null
                            }
                            {
                                (ele.major) ? <Text style={styles.text}>Major: {ele.major}</Text> : null
                            }
                        </View>
                    ))}
                </View>
                <View>
                    <Text style={styles.title}>Experience:</Text>
                    {data.experience.map(ele => (
                        <View key={ele.id} style={styles.generalInformation}>
                            <Text style={styles.text}>{ele.company} - {ele.position}</Text>
                            {(ele.timeJobStart && ele.timeJobEnd) ? (<Text style={styles.text}>{`${ele.timeJobStart}-${ele.timeJobEnd}`}</Text>) : null}
                            {ele.description ? <Text style={styles.text}>{ele.description}</Text> : null}
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
}
