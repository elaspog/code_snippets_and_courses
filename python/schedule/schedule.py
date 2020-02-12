#!/usr/bin/env python

import schedule
import time


def dummy_job():
    print("Working...")


if __name__ == "__main__":

    daily = '12:00'
    weekday = '09:00'
    weekend = '15:00'

    schedule.every().day.at(daily).do(dummy_job)

    schedule.every().monday.at(weekday).do(dummy_job)
    schedule.every().tuesday.at(weekday).do(dummy_job)
    schedule.every().wednesday.at(weekday).do(dummy_job)
    schedule.every().thursday.at(weekday).do(dummy_job)
    schedule.every().friday.at(weekday).do(dummy_job)

    schedule.every().saturday.at(weekend).do(dummy_job)
    schedule.every().sunday.at(weekend).do(dummy_job)

    while True:
        schedule.run_pending()
        time.sleep(10)
