import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/results-title/results-title";
import Button from "../../components/ui/button/button";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import { getFilteredEvents } from "../../dummy-data";


export default function FilteredEvent() {
    const router = useRouter();

    const filterData = router.query.slug;

    if (!filterData) {
        return (
            <p className="center">
                Loading...
            </p>
        );
    };

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12
    ) {
        return (
            <>
                <ErrorAlert>
                    <p>Invalid filter, please adjust values.</p>
                </ErrorAlert>

                <div className="center">
                    <Button link="/events">
                        Shall All Events
                    </Button>
                </div>
            </>
        );
    };

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                <ErrorAlert>
                    <p>No events found for chosen filter.</p>
                </ErrorAlert>

                <div className="center">
                    <Button link="/events">
                        Shall All Events
                    </Button>
                </div>
            </>
        );
    };

    const date = new Date(numYear, numMonth - 1);

    return (
        <>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    );
};
