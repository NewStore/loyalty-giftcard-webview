import { useState } from 'react';
import styled from 'styled-components';
import {FieldContainer, FieldTitle, FieldValue} from '../App';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Fader from './Fader';

const Button = styled.button`
    margin-top: ${props => props.theme.spacing4};
    margin-left: -2px;
    font-size: ${props => props.theme.fontSize.subhead};
`

function CopyField(props) {
    const { label, data } = props;
    const [showConfirmation, setShowConfirmation] = useState(false)

    return (
        <FieldContainer>
            <FieldTitle>{label}</FieldTitle>
            <FieldValue>{data.code}</FieldValue>
            <FieldValue>${data.amount}</FieldValue>
            <CopyToClipboard 
                text={data.code}
                onCopy={() => setShowConfirmation(true)}
                style={{
                    marginTop: props => props.theme.spacing8,
                    display: "inline-block",
                }}
                >
                <Button>Copy to Clipboard</Button>
            </CopyToClipboard>
            <Fader 
                text='Copied!' 
                visible={showConfirmation}
                setShowConfirmation={setShowConfirmation}
            />
        </FieldContainer>
    )
}

export default CopyField
