import { NextPageContext } from 'next';

export default function Event({event_id}) {
  return (
    <div>
      <h1>Event: {event_id}</h1>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { event_id } = context.query;
  return {
    props: {
      event_id,
    },
  };
}