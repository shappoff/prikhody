'use client';

import { useState } from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { copyToClipboard } from '@/components/utils';
import { getAdminEmail, getAdminMailtoHref } from '@/components/featured/prikhody/adminEmail';
import './SendArchivesData.css';

/**
 * Contact hint for archive corrections.
 * Email is assembled only after user interaction — not present in initial SSR HTML for bots.
 */
const SendArchivesData = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [copiedOpen, setCopiedOpen] = useState(false);

    const revealEmail = () => {
        setEmail(getAdminEmail());
    };

    const handleCopy = () => {
        if (!email) {
            return;
        }
        copyToClipboard(email, () => setCopiedOpen(true));
    };

    return (
        <section className="send-archives-contact" aria-label="Связь с администратором">
            <p className="send-archives-contact__hint">
                Нашли неточность или можете дополнить сохранность — напишите администратору.
            </p>
            <div className="send-archives-contact__actions">
                {!email ? (
                    <Button
                        type="button"
                        variant="outlined"
                        size="small"
                        startIcon={<MailOutlinedIcon />}
                        onClick={revealEmail}
                        aria-label="Показать адрес электронной почты администратора"
                    >
                        Показать почту
                    </Button>
                ) : (
                    <>
                        <Link
                            className="send-archives-contact__email"
                            href={getAdminMailtoHref()}
                            rel="nofollow noopener"
                            underline="hover"
                            aria-live="polite"
                        >
                            {email}
                        </Link>
                        <Button
                            type="button"
                            variant="text"
                            size="small"
                            startIcon={<ContentCopyIcon />}
                            onClick={handleCopy}
                            aria-label="Скопировать адрес электронной почты"
                        >
                            Копировать
                        </Button>
                    </>
                )}
            </div>
            <Snackbar
                open={copiedOpen}
                autoHideDuration={2000}
                onClose={() => setCopiedOpen(false)}
                message="Адрес скопирован"
            />
        </section>
    );
};

export default SendArchivesData;
