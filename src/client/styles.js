
const maxWidth = 1200;

const extraLarageSpacing = 40;
const largeSpacing = 20;
const prettyLargeSpacing = 15;
const prettySmallSpacing = 10;
const smallSpacing = 5;
const reallySmallSpacing = 2;

const mediumFontSize = 16;
const smallFontSize = 14;

const dangerColor = 'red';

export const styles = {
    headerBar: {
        margin: 'auto',
        maxWidth: maxWidth,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        maxWidth: maxWidth

    },
    loginContainer: {
        margin: extraLarageSpacing,
        border: '1px solid',
        borderRadius: '5px',
        width: '100%',
        maxWidth: maxWidth / 5,
        padding: extraLarageSpacing,
        display: 'flex',
        alignSelf: 'center',
        flexFlow: 'column',
        alignItems: 'center'
    },
    loginField: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '10pt'
    },
    loginLabel: {
        margin: reallySmallSpacing,
        fontSize: mediumFontSize
    },
    loginInput: {
        margin: reallySmallSpacing,
        border: '1px solid',
        borderRadius: '5pt',
        padding: prettySmallSpacing
    },
    noteContainer: {
        border: "1px solid",
        borderRadius: '4px',
        boxSizing: 'border-box',
        padding: prettyLargeSpacing,
        margin: prettySmallSpacing,
        width: '100%',
        maxWidth: '600px',
        fontSize: mediumFontSize,
    },
    inputField: {
        border: "1px solid",
        borderRadius: '4px',
        boxSizing: 'border-box',
        padding: prettyLargeSpacing,
        margin: prettySmallSpacing,
        width: '100%',
        fontSize: mediumFontSize
    },
    secondaryBtn: {
        padding: prettySmallSpacing,
        border: '1px solid',
        borderRadius: 4,
        margin: prettySmallSpacing,
        fontSize: mediumFontSize
    },
    buttonStyle: {
        padding: largeSpacing,
        borderRadius: '5px',
        border: '1px solid',
        fontSize: mediumFontSize
    },
    errorMsg: {fontSize: smallFontSize, color: dangerColor, width: 'inherit'}
}
