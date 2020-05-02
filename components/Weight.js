import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Button from "../components/Button";
import ErrorFeedback from "../components/ErrorFeedback";
import FormElement from "../components/FormElement";
import Input from "../components/Input";

const DECIMAL_PLACES = 1;

const WEIGHTS = gql`
  query Weights {
    weights {
      value
      timestamp
    }
  }
`;

const ADD_WEIGHT = gql`
  mutation addWeight($value: Int!) {
    addWeight(value: $value) {
      value
      timestamp
    }
  }
`;

const WeightForm = ({ currentWeight }) => {
  const [addWeight] = useMutation(ADD_WEIGHT);
  const [weight, setWeight] = useState(
    parseFloat(currentWeight || 0).toFixed(DECIMAL_PLACES)
  );
  const [pending, setPending] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setPending(true);
    setHasError(false);

    addWeight({
      variables: { value: weight * 1000 },
      update: (store, { data: { addWeight } }) => {
        const data = store.readQuery({ query: WEIGHTS });
        store.writeQuery({
          query: WEIGHTS,
          data: { weights: [addWeight, ...data.weights] },
        });
      },
    })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormElement label="Weight">
        <Input
          type="number"
          placeholder="Weight"
          value={weight}
          onChange={(value) => {
            setWeight(parseFloat(value).toFixed(DECIMAL_PLACES));
          }}
          step="0.1"
        />
      </FormElement>
      <Button
        type="submit"
        state={pending ? "pending" : "default"}
        className="mt-8 w-full"
      >
        Submit weight
      </Button>
      {hasError && <ErrorFeedback />}
    </form>
  );
};

const Weight = () => {
  const { loading, error, data } = useQuery(WEIGHTS);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { weights } = data;

  return (
    <div>
      <WeightForm
        currentWeight={weights.length ? weights[0].value / 1000 : 0}
      />
      <ul>
        {weights.map(({ timestamp, value }) => (
          <li key={timestamp}>
            {timestamp} - {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Weight;
