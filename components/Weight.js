import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Button from "../components/Button";
import ErrorFeedback from "../components/ErrorFeedback";
import FormElement from "../components/FormElement";
import Input from "../components/Input";

const DECIMAL_PLACES = 1;

const gramToKilo = (value) => parseFloat(value / 1000).toFixed(DECIMAL_PLACES);
const kiloToGram = (value) => value * 1000;

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
  const [weight, setWeight] = useState(currentWeight || 0);
  const [pending, setPending] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setPending(true);
    setHasError(false);

    addWeight({
      variables: { value: weight },
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
          value={gramToKilo(weight)}
          onChange={(value) => setWeight(kiloToGram(value))}
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

const toDateTime = (timestamp) => {
  const date = new Date(+timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
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
      <WeightForm currentWeight={weights.length ? weights[0].value : 0} />
      <ul>
        {weights.map(({ timestamp, value }) => (
          <li key={timestamp}>
            {toDateTime(timestamp)} - {gramToKilo(value)} KG
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Weight;
