/* eslint-disable max-statements */
import { add, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Badge, Button, RowContainer } from "../../components";
import {
  AccountHeadline, AccountLabel, AccountList, AccountListItem, AccountSection, InfoText, Inset, Box, AccountListBadgeItem
} from "./style";


const account = {
  uid: "65156cdc-5cfd-4b34-b626-49c83569f35e",
  deleted: false,
  dateCreated: "2020-12-03T08:55:33.421Z",
  currency: "GBP",
  name: "15 Temple Way",
  bankName: "Residential",
  type: "properties",
  subType: "residential",
  originalPurchasePrice: 250000,
  originalPurchasePriceDate: "2017-09-03",
  recentValuation: { amount: 310000, status: "good" },
  associatedMortgages: [
    {
      name: "HSBC Repayment Mortgage",
      uid: "fb463121-b51a-490d-9f19-d2ea76f05e25",
      currentBalance: -175000,
    },
  ],
  canBeManaged: false,
  postcode: "BS1 2AA",
  lastUpdate: "2020-12-01T08:55:33.421Z",
  updateAfterDays: 30,
  sincePurchase() {
    return this.recentValuation.amount - this.originalPurchasePrice;
  },
  sincePurchasePercentage() {
    return this.sincePurchase() / this.originalPurchasePrice * 100;
  },
  annualAppreciation() {
    return this.sincePurchasePercentage() / 5;
  },
};

const Detail = ({}) => {
  const [content] = useState(account);

  useEffect(() => {
    window
      .fetch("/api/account")
      .then((res) => res.json())
      .then(console.log);
  }, []);

  let mortgage;
  const lastUpdate = new Date(account.lastUpdate);
  if (account.associatedMortgages.length) {
    mortgage = account.associatedMortgages[0];
  }

  return (
    <Inset>
      <AccountSection>
        <AccountLabel>Estimated Value</AccountLabel>
        <AccountHeadline>
          {new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(content.recentValuation.amount)}
        </AccountHeadline>
        <AccountList>
          <AccountListItem><InfoText>
            {`Last updated ${format(lastUpdate, "do MMM yyyy")}`}
          </InfoText></AccountListItem>
          <AccountListItem><InfoText>
            {`Next update ${format(
              add(lastUpdate, { days: content.updateAfterDays }),
              "do MMM yyyy"
            )}`}
          </InfoText></AccountListItem>
        </AccountList>
      </AccountSection>
      <AccountSection>
        <AccountLabel>Property details</AccountLabel>
        <RowContainer>
          <AccountList>
            <AccountListItem><InfoText>{content.name}</InfoText></AccountListItem>
            <AccountListItem><InfoText>{content.bankName}</InfoText></AccountListItem>
            <AccountListItem><InfoText>{content.postcode}</InfoText></AccountListItem>
          </AccountList>
        </RowContainer>
      </AccountSection>
      <AccountSection>
        <AccountLabel>Valuation change</AccountLabel>
        <InfoText>Purchased for {content.originalPurchasePrice} in {content.originalPurchasePriceDate}</InfoText>
        <RowContainer>
          <AccountList>
            <AccountListItem><InfoText>Since purchase</InfoText></AccountListItem>
            <AccountListItem><InfoText>Annual appreciation</InfoText></AccountListItem>
          </AccountList>
          <AccountList>
            <AccountListBadgeItem><Badge>{`£${content.sincePurchase()} (${content.sincePurchasePercentage()}%)`}</Badge></AccountListBadgeItem>
            <AccountListBadgeItem><Badge>{`${content.annualAppreciation()} %`}</Badge></AccountListBadgeItem>
          </AccountList>
        </RowContainer>
      </AccountSection>
      {mortgage && (
        <AccountSection>
          <AccountLabel>Mortgage</AccountLabel>
          <RowContainer
            // This is a dummy action
            onClick={() => alert("You have navigated to the mortgage page")}
          >
            <AccountList>
              <AccountListItem><InfoText>
                {new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(
                  Math.abs(content.associatedMortgages[0].currentBalance)
                )}
              </InfoText></AccountListItem>
              <AccountListItem><InfoText>{content.associatedMortgages[0].name}</InfoText></AccountListItem>
            </AccountList>
          </RowContainer>
        </AccountSection>
      )}
      <Button
        // This is a dummy action
        onClick={() => alert("You have navigated to the edit account page")}
      >
        Edit account
      </Button>
    </Inset>
  );
};

export default Detail;
