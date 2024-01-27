import { Fragment } from 'react';

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';

function EventDetailPage(props) {
  if (!props.event) {
    return (
      <div className="center">
        <p>Loading....</p>
      </div>
    );
  }
  const event = props.event;

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

// To prerender dynamic url website you need to tell next, what dynamic url e.g. 'e1' it could get.
// You use for that getStaticPaths, where you fetch events and return eventId = [eventId].js, and return possible dynamic urls
// fallback: false - means that next should not expect others than provided dynamic paths urls
// fallback: blocking - block showing page until all data fetched
// fallback: true - when true, we have to handle what happend when data was not loaded yet (Show loading screen)

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: true,
  };
}

export default EventDetailPage;
