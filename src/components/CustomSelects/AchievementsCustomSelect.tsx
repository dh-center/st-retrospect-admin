import { ReactElement, ReactNode } from 'react';
import environment from '../../appEnv';
import graphql from 'babel-plugin-relay/macro';
import CustomSelect from '../utils/CustomSelect';
import { QueryRenderer } from 'react-relay';
import withLabel from '../utils/LabeledComponent';
import styles from './CustomSelects.module.css';
import LoadingPlaceholder from '../utils/LoadingPlaceholder';
import { CustomSelectProps } from './CustomSelectProps';
import { AchievementsCustomSelect_achievementsQuery } from './__generated__/AchievementsCustomSelect_achievementsQuery.graphql';

/**
 * Displays custom select for achievements
 *
 * @param componentProps - props with onChange event handler
 */
export default function AchievementsCustomSelect(componentProps: CustomSelectProps): ReactElement {
  const onChange = componentProps.onChange;

  return (
    <QueryRenderer<AchievementsCustomSelect_achievementsQuery>
      environment={environment}
      query={graphql`
        query AchievementsCustomSelect_achievementsQuery {
          achievements {
            value: id
            name
          }
        }
      `}
      render={({ error, props }): ReactNode => {
        if (error) {
          return <div>Error!</div>;
        }

        if (!props) {
          return (
            <div className={styles.loadingContainer}>
              <LoadingPlaceholder
                alt='Loading achievements...'
                isSmall
              />
            </div>
          );
        }

        const options = props.achievements.map(achievement => {
          return {
            value: achievement.value,
            name: achievement.name,
          };
        });

        return <CustomSelect
          disabled={componentProps.disabled}
          onChange={(selected) => {
            onChange(selected);
          }}
          options={options}
          placeholder='Select an achievement...'
          value={componentProps.value}
        />;
      }}
      variables={{}}
    />
  );
}

/**
 * Returns AchievementsCustomSelect component with label
 */
export const LabeledAchievementsCustomSelect = withLabel(AchievementsCustomSelect);
