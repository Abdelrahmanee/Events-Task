

import schedule from 'node-schedule'
import { User } from '../../db/models/user.model.js'
import { Event } from '../../db/models/event.model.js'
import { EVENTSTATUS } from './enums.js'




export const cron = () => {

    schedule.scheduleJob({ hour: 0, minute: 0, second: 0 }, async function () {
        await User.deleteMany({ isEmailVerified: false })
    })
    schedule.scheduleJob({ hour: 0, minute: 0, second: 0 }, async function () {
        const events = await Event.find()
        for (const event of events) {
            const { startedAt, endedAt } = event;
            let now_date = new Date(Date.now())
            let event_start = new Date(startedAt)
            let event_end = new Date(endedAt)
            if (now_date > event_start && now_date < event_end && status !== EVENTSTATUS.STARTED) {
                event.status = EVENTSTATUS.STARTED
                await event.save()
            }
            else if (now_date > event_end && status !== EVENTSTATUS.ENDED) {
                event.status = EVENTSTATUS.ENDED
                await event.save()
            }
        }
    }
    )
}