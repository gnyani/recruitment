/* @flow */

import React from 'react';
import { graphql } from 'react-relay';
import { Flex } from '@rebass/grid/emotion';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from '../../controls/link';

import {
  type FragmentRefs,
  createFragment,
  createMutation,
} from '../../controls/relay';

import type { Property_property } from './__generated__/Property_property.graphql';
import type { PropertyUpsertMutation } from './__generated__/PropertyUpsertMutation.graphql';

type PropertyData = {|
  lead?: Property_property,
|};

const PropertyFragment = createFragment<PropertyData>(
  graphql`
    fragment Property_property on Property {
      id
      livingSurface
      landSurface
      numberOfRooms
      numberOfParkings
    }
  `
);

const PropertyUpsertLead = createMutation<PropertyUpsertMutation, {}>(graphql`
  mutation PropertyUpsertMutation($input: UpsertPropertyInput!) {
    upsertProperty(input: $input) {
      property {
        id
        livingSurface
        landSurface
        numberOfRooms
        numberOfParkings
      }
    }
  }
`);

const styles = {
  height: 40,
  borderColor: 'gray',
  borderWidth: 1,
  width: 300,
  padding: 8,
  fontSize: 18,
};

type Props = {|
  ...FragmentRefs<PropertyData>,
  step?: string,
|};

export const Property = (props: Props) => {
  return (
    <>
      <PropertyFragment property={props.property}>
        {(/* use { property } to get the query data*/) => (
          <Flex justifyContent="center">
            <Paper
              css={{ maxWidth: 960, marginTop: 16, width: '100%', padding: 16 }}
            >
              <PropertyUpsertLead>
                {(/* use { mutate, mutating } to commit changes to the API */) => (
                  <>
                    <Formik
                      initialValues={{
                        livingSurface: '',
                        landSurface: '',
                        NoOfRooms: '',
                        NoOfParkings: '',
                      }}
                      validate={values => {
                        let errors = {};
                        if (!values.livingSurface) {
                          errors.livingSurface = 'Required';
                        }
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                          alert(JSON.stringify({ values }));
                          setSubmitting(false);
                        }, 400);
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <label>livingSurface</label>
                          <Field
                            type="text"
                            name="livingSurface"
                            style={styles}
                          />
                          <ErrorMessage name="livingSurface" component="div" />
                          <br />
                          <label>landSurface</label>
                          <Field
                            type="text"
                            name="landSurface"
                            style={styles}
                          />
                          <ErrorMessage name="landSurface" component="div" />
                          <br />
                          <label>NoOfRooms</label>
                          <Field type="text" name="NoOfRooms" style={styles} />
                          <ErrorMessage name="NoOfRooms" component="div" />
                          <br />
                          <label>NoOfParkings</label>
                          <Field
                            type="text"
                            name="NoOfParkings"
                            style={styles}
                          />
                          <ErrorMessage name="NoOfParkings" component="div" />
                          <br />
                          <button type="submit" disabled={isSubmitting}>
                            Submit
                          </button>
                        </Form>
                      )}
                    </Formik>
                    <Link href={{ pathname: '/' }}>
                      <Button
                        to="/"
                        color="primary"
                        variant="contained"
                        css={{ marginTop: 80 }}
                      >
                        Back to instructions
                      </Button>
                    </Link>
                  </>
                )}
              </PropertyUpsertLead>
            </Paper>
          </Flex>
        )}
      </PropertyFragment>
    </>
  );
};
