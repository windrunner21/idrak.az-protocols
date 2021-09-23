import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
export default function PDFDocument(props) {
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Idrak Protocol System</Text>
        </View>
        <View style={styles.section}>
          <Text>auto generateds</Text>
        </View>
        <View>
          <Text>{props.document}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <PDFViewer>
      <MyDocument />
    </PDFViewer>
  );
}
