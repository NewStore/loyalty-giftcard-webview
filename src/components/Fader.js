import { useState, useEffect } from 'react';
import styled from 'styled-components';

const CopiedText = styled.p`
    font-size: ${props => props.theme.fontSize.footnote};
    margin: 0 0 0 ${props => props.theme.spacing8};
    padding: 0;
    display: inline-block;
    transition: opacity 1s ease;
`

function Fader(props) {
    const { text, visible, setShowConfirmation } = props;
    const [fade, setFade] = useState(false)

    const fadeOut = () => {
        setFade(true)
        setTimeout(() => cleanup(), 1000)
    }

    const cleanup = () => {
        setShowConfirmation(false)
        setFade(false)
    }

    useEffect(() => {
        if (visible) {
            setTimeout(() => fadeOut(), 3000)
        }
    }, [visible])

    return ( visible ?
        <CopiedText
            style={fade ? {opacity: 0} : null}
        >{text}
        </CopiedText> :
        null
    )
}

export default Fader