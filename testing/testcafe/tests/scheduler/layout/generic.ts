import { createScreenshotsComparer } from '../../../helpers/screenshot-comparer';
import createWidget from '../../../helpers/createWidget';
import url from '../../../helpers/getPageUrl';
import Scheduler from '../../../model/scheduler';

fixture`Scheduler: Generic theme layout`
  .page(url(__dirname, '../../container.html'));

[1, 2].forEach((intervalCount) => {
  ['horizontal', 'vertical'].forEach((groupOrientation) => {
    [true, false].forEach((showAllDayPanel) => {
      const testName = `Day view with interval and crossScrollingEnabled, groupOrientation='${groupOrientation}', showAllDayPanel='${showAllDayPanel}', intervalCount='${intervalCount}'
      layout test`;

      test(testName, async (t) => {
        const scheduler = new Scheduler('#container');
        const { takeScreenshot, compareResults } = createScreenshotsComparer(t);

        const pngName = `day-view-with-interval-crossScrollingEnabled-groupOrientation=${groupOrientation}-showAllDayPanel=${showAllDayPanel}-intervalCount=${intervalCount}.png`;

        await t
          .expect(await takeScreenshot(pngName, scheduler.workSpace))
          .ok()

          .expect(compareResults.isValid())
          .ok(compareResults.errorMessages());
      }).before(() => createWidget('dxScheduler', {
        resources: [{
          fieldExpr: 'roomId',
          dataSource: [{
            text: 'Room 1',
            id: 1,
          }, {
            text: 'Room 2',
            id: 2,
          }],
          label: 'Room',
        }],
        dataSource: [],
        views: [{
          name: 'dayView',
          type: 'day',
          intervalCount,
          groupOrientation,
        }],
        currentView: 'dayView',
        currentDate: new Date(2021, 4, 25),
        height: 600,
        groups: ['roomId'],
        showAllDayPanel,
        crossScrollingEnabled: true,
      }));
    });
  });
});
