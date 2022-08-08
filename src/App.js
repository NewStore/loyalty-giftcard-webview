import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CopyField from './components/CopyField';
import {loyaltyUrl} from './constants';
//loyaltyData can be used for local testing if the lambda isn't set up
// webViewData can be used for testing in local computer's web browser - which doesn't receive window.NEWSTORE
//import { webviewData, loyaltyData } from './sample_data'

const WebViewContainer = styled.div`
  background-color: ${props => props.theme.color.white};
  overflow: 'scroll';
`

const NoLoyaltyText = styled.p`
  color: ${props => props.theme.color.gray400};
  font-weight: ${props => props.theme.fontWeight.normal};
  font-size: ${props => props.theme.fontSize.headline};
  text-align: center;
  margin-top: 45vh;
`

const HeaderContainer = styled.div`
  background-color: ${props => props.theme.color.white};
  position: fixed;
  width: 100%;
`

const HeaderSkirt = styled.div`
  height: ${props => props.theme.spacing20};
  background-color: ${props => props.theme.color.gray100};
`

const PageTitle = styled.p`
  color: ${props => props.theme.color.black};
  font-weight: ${props => props.theme.fontWeight.normal};
  font-size: ${props => props.theme.fontSize.headline};
  text-align: center;
  margin: ${props => props.theme.spacing12};
`

const ContentContainer = styled.div`
  background-color: ${props => props.theme.color.gray100};
  height: ${props => {
    console.log("props: ", props)
    return props.dimensions.height
  }}px;
  padding-top: ${props => props.theme.spacing64};
  padding-bottom: ${props => props.theme.spacing64};
  text-align: left;
`

export const FieldContainer = styled.div`
  margin: ${props => props.theme.spacing16};
  color: black;
  background: white;
  border-radius: 8px;
  padding: ${props => props.theme.spacing16};
  box-shadow: 3px 2px 4px ${props => props.theme.color.gray200};
`

export const FieldTitle = styled.p`
  color: ${props => props.theme.color.gray600};
  font-size: ${props => props.theme.fontSize.subhead};
  padding: 0;
  margin: 0;
`

export const FieldValue = styled.p`
  color: ${props => props.theme.color.black};
  font-size: ${props => props.theme.fontSize.body1};
  padding: 0;
  padding-top: ${props => props.theme.spacing4};
  margin: 0;
`

function App(props) {
  const [response, setResponse] = useState(null)

  const { cart } = window?.NEWSTORE?.contextProps;
  const token = window?.NEWSTORE?.securityToken;
  const dimensions = window?.NEWSTORE?.dimensions;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(loyaltyUrl, {
        method: "POST",
        body: {
          email: cart.customerEmail,
          cart: cart,
          token: token,
        }
      })
      return res.json()
    }

    fetchData()
      .then(res => setResponse(res))
      .catch(err => console.log("error: ", err))
  }, []);

  const textFields = [
    {
      title: "Member ID",
      value: response?.membership_id
    },
    {
      title: "Loyalty Points",
      value: response?.loyalty_points
    },
    {
      title: "Loyalty Tier",
      value: response?.loyalty_tier
    },
  ]

  return (
    !response?.membership_id ?
    (
      <WebViewContainer>
        <NoLoyaltyText>User is not enrolled in loyalty!</NoLoyaltyText>
      </WebViewContainer>
    ) :
    (
      <WebViewContainer>
        <HeaderContainer>
          <PageTitle>Customer Loyalty</PageTitle>
          <HeaderSkirt></HeaderSkirt>
        </HeaderContainer>
        <ContentContainer dimensions={dimensions}>
          {textFields.map(field => {
            return (
              <FieldContainer>
                <FieldTitle>{field.title}</FieldTitle>
                <FieldValue>{field.value}</FieldValue>
              </FieldContainer>
            )
          })}
          { response?.reward_info &&
            <CopyField
              label="Reward GC"
              data={response?.reward_info}
            />
          }
          {response?.store_credit_info && response?.store_credit_info.map(field => {
            return (
              <CopyField
                label="Store Credit GC"
                data={field}
              /> 
            )
          })}
        </ContentContainer>
      </WebViewContainer>
    )
  );
}
export default App;
