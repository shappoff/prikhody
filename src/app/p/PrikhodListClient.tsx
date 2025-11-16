'use client'

import List from '@/components/shared/List';
import ListItem from '@/components/shared/ListItem';
import ListItemText from '@/components/shared/ListItemText';
import CreatePortalWrapper from "@/components/shared/CreatePortalWrapper";

interface PrikhodListClientProps {
  allPrikhods: any[];
}

export default function PrikhodListClient({ allPrikhods }: PrikhodListClientProps) {
  return <CreatePortalWrapper id="slide-panel-info">
    <List key="prikhody-list">
      {
        allPrikhods
          .sort((a: any, b: any) => a[2].localeCompare(b[2]))
          .map(([id, title, np, npType, lat, lng, , atdStr]: any, index: number) =>
            <ListItem key={id}>
              <span>{index + 1}. </span>
              <a href={`/p/${id}`}
                 title={`${title}`}
                 aria-label={`${title}`}
              >
                <ListItemText primary={`${npType} ${np}, ${title}, ${atdStr?.split('|').join(', ')}`}/>
              </a>
            </ListItem>
          )
      }
    </List>
  </CreatePortalWrapper>
}

