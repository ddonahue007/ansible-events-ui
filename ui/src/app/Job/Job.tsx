import { PageSection, Title } from '@patternfly/react-core';
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Ansi from "ansi-to-react";
import {
  Card,
  CardBody as PFCardBody,
  CardTitle,
  SimpleList as PFSimpleList,
  SimpleListItem,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import styled from 'styled-components';
import {getServer} from '@app/utils/utils';
import {TopToolbar} from "@app/shared/top-toolbar";


const CardBody = styled(PFCardBody)`
  white-space: pre-wrap;
  `
const SimpleList = styled(PFSimpleList)`
  white-space: pre-wrap;
`

const endpoint = 'http://' + getServer() + '/api/job_instance/';
const event_endpoint = 'http://' + getServer() + '/api/job_instance_events/';

const Job: React.FunctionComponent = () => {

  const [job, setJob] = useState([]);
  const [stdout, setStdout] = useState([]);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
     fetch(endpoint + id, {
       headers: {
         'Content-Type': 'application/json',
       },
     }).then(response => response.json())
    .then(data => setJob(data));
     fetch(event_endpoint + id, {
       headers: {
         'Content-Type': 'application/json',
       },
     }).then(response => response.json())
    .then(data => setStdout(data));
  }, []);

  return (
  <React.Fragment>
    <TopToolbar>
      <Title headingLevel={"h2"}>{`Job ${job.id}`}</Title>
    </TopToolbar>
    <Stack>
      <StackItem>
        <Card>
          <CardTitle>Standard Out</CardTitle>
          <CardBody>
            {stdout.length !== 0 && (
              <SimpleList style={{ whiteSpace: 'pre-wrap' }}>
                {stdout.map((item, i) => (
                  <SimpleListItem key={i}><Ansi>{item.stdout}</Ansi></SimpleListItem>
                ))}
              </SimpleList>
            )}
          </CardBody>
        </Card>
      </StackItem>
  </Stack>
  </React.Fragment>
)
}

export { Job };
